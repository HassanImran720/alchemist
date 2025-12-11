"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-md"></div>
});

// Import Quill CSS
import 'react-quill-new/dist/quill.snow.css';

interface EditResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  aiResponse: string;
  onSave: (editedContent: string) => void;
}

const EditResponseModal: React.FC<EditResponseModalProps> = ({
  isOpen,
  onClose,
  aiResponse,
  onSave,
}) => {
  const [editText, setEditText] = useState(aiResponse || "");

  // Update editText when aiResponse changes
  useEffect(() => {
    if (isOpen && aiResponse) {
      // Check if the response is already HTML (from previous edit)
      const htmlPattern = /<\/?[a-z][\s\S]*>/i;
      const isHTML = htmlPattern.test(aiResponse);
      
      if (isHTML) {
        // Clean up HTML - remove unsupported tags and attributes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = aiResponse;
        
        // Remove strike, code, blockquote, links, and other unsupported elements
        const unsupportedTags = ['strike', 's', 'del', 'code', 'pre', 'blockquote', 'a', 'span', 'font'];
        unsupportedTags.forEach(tag => {
          const elements = tempDiv.querySelectorAll(tag);
          elements.forEach(el => {
            const text = el.textContent || '';
            el.replaceWith(document.createTextNode(text));
          });
        });
        
        // Remove inline styles and classes
        const allElements = tempDiv.querySelectorAll('*');
        allElements.forEach(el => {
          el.removeAttribute('style');
          el.removeAttribute('class');
          el.removeAttribute('color');
        });
        
        setEditText(tempDiv.innerHTML);
      } else {
        // Convert plain text/markdown to clean HTML
        let html = aiResponse;
        
        // Convert markdown headings to HTML
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        
        // Convert markdown bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
        
        // Convert markdown italic
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');
        
        // Convert markdown lists
        const lines = html.split('\n');
        let inList = false;
        let listType = '';
        const processed: string[] = [];
        
        lines.forEach(line => {
          const ulMatch = line.match(/^[\s]*[-*]\s+(.+)$/);
          const olMatch = line.match(/^[\s]*\d+\.\s+(.+)$/);
          
          if (ulMatch) {
            if (!inList || listType !== 'ul') {
              if (inList) processed.push(`</${listType}>`);
              processed.push('<ul>');
              listType = 'ul';
              inList = true;
            }
            processed.push(`<li>${ulMatch[1]}</li>`);
          } else if (olMatch) {
            if (!inList || listType !== 'ol') {
              if (inList) processed.push(`</${listType}>`);
              processed.push('<ol>');
              listType = 'ol';
              inList = true;
            }
            processed.push(`<li>${olMatch[1]}</li>`);
          } else {
            if (inList) {
              processed.push(`</${listType}>`);
              inList = false;
              listType = '';
            }
            if (line.trim()) {
              processed.push(`<p>${line}</p>`);
            } else {
              processed.push('<br>');
            }
          }
        });
        
        if (inList) processed.push(`</${listType}>`);
        
        setEditText(processed.join(''));
      }
    }
  }, [isOpen, aiResponse]);

  // Quill editor configuration - simplified toolbar
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],  // Only H1, H2, H3
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet'
  ];

  const handleClose = () => {
    setEditText(aiResponse || "");
    onClose();
  };

  const saveEditedContent = () => {
    // Convert HTML to clean markdown format
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editText;
    
    let markdown = '';
    
    const processNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName.toLowerCase();
        const childText = Array.from(element.childNodes).map(processNode).join('');
        
        switch (tagName) {
          case 'h1':
            return `# ${childText}\n\n`;
          case 'h2':
            return `## ${childText}\n\n`;
          case 'h3':
            return `### ${childText}\n\n`;
          case 'strong':
          case 'b':
            return `**${childText}**`;
          case 'em':
          case 'i':
            return `*${childText}*`;
          case 'u':
            return childText; // Keep underline as plain text
          case 'ul':
            return processListItems(element, '-') + '\n';
          case 'ol':
            return processListItems(element, '1.') + '\n';
          case 'li':
            return ''; // Handled in processListItems
          case 'p':
            return childText + '\n\n';
          case 'br':
            return '\n';
          default:
            return childText;
        }
      }
      
      return '';
    };
    
    const processListItems = (listElement: HTMLElement, marker: string): string => {
      const items = Array.from(listElement.querySelectorAll(':scope > li'));
      return items.map((item, index) => {
        const itemMarker = marker === '1.' ? `${index + 1}.` : marker;
        const text = Array.from(item.childNodes).map(processNode).join('').trim();
        return `${itemMarker} ${text}`;
      }).join('\n');
    };
    
    markdown = Array.from(tempDiv.childNodes).map(processNode).join('');
    
    // Clean up extra newlines
    markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();
    
    onSave(markdown);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Response</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Editor Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="min-h-[400px]">
            <ReactQuill
              theme="snow"
              value={editText}
              onChange={setEditText}
              modules={quillModules}
              formats={quillFormats}
              style={{ 
                height: '450px',
                fontFamily: 'inherit'
              }}
              placeholder="Start editing your response..."
            />
          </div>
          <div className="mt-16 text-xs text-gray-500">
            Use the toolbar above to format your text. All spacing and line breaks will be preserved when saved.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={saveEditedContent}
            className="px-4 py-2 text-white bg-gold hover:bg-yellow-600 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditResponseModal;
