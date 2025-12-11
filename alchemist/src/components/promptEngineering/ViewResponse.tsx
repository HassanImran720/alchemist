"use client";
import { useRef, useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface TestAIResponseStepProps {
  aiResponse: string;
  onOpenSaveModal?: () => void;
  onOpenEditModal?: () => void;
}

const ViewResponse: React.FC<TestAIResponseStepProps> = ({ aiResponse, onOpenEditModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Auto scroll to top when response updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [aiResponse]);

  // Copy response to clipboard with formatting preserved
  const handleCopyResponse = async () => {
    try {
      // Create a temporary container to hold the formatted HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = getFormattedContent();
      
      // Try to copy as both HTML and plain text for maximum compatibility
      if (navigator.clipboard && window.ClipboardItem) {
        // Modern browsers with rich text support
        const htmlBlob = new Blob([tempDiv.innerHTML], { type: 'text/html' });
        const textBlob = new Blob([aiResponse], { type: 'text/plain' });
        
        const clipboardItem = new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob,
        });
        
        await navigator.clipboard.write([clipboardItem]);
      } else {
        // Fallback for older browsers - copy plain text only
        await navigator.clipboard.writeText(aiResponse);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy response:", err);
      // Final fallback - try plain text copy
      try {
        await navigator.clipboard.writeText(aiResponse);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("All copy methods failed:", fallbackErr);
      }
    }
  };

  // Convert content to safe HTML
  const getFormattedContent = (): string => {
    if (!aiResponse) return "";

    // Always treat as markdown for consistency
    try {
      // Configure marked for cleaner output
      const htmlContent = marked.parse(aiResponse, {
        breaks: true,
        gfm: true
      }) as string;
      
      return DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h1', 'h2', 'h3',
          'ul', 'ol', 'li'
        ],
        ALLOWED_ATTR: []
      });
    } catch (error) {
      console.error("Markdown parsing error:", error);
      // Fallback: escape and show as plain text with line breaks
      return aiResponse
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    }
  };

  return (
    <div className="rounded-xl border border-gold/30 p-3 sm:p-4 md:p-6 mb-4 md:mb-8 bg-ivory/70 backdrop-blur-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base md:text-lg text-black font-semibold">
          <strong>X. View Response:</strong>
        </h2>
        <div className="flex items-center gap-2">
          {aiResponse && (
            <button
              onClick={onOpenEditModal}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gold/30 rounded-md hover:bg-gold/10 transition-colors"
            >
              <span>Edit Response</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Area with proper formatting */}
      <div className="mb-2 flex-1 min-h-0">
        <div
          ref={containerRef}
          className="relative p-4 border border-gold/30 rounded-md bg-ivory text-black max-w-full leading-relaxed overflow-auto h-full custom-scroll formatted-content"
          dangerouslySetInnerHTML={{ __html: getFormattedContent() }}
        />
        {!aiResponse && (
          <div className="p-4 border border-gold/30 rounded-md bg-ivory">
            <p className="text-gray-500 italic">No AI response yet...</p>
          </div>
        )}
      </div>

      {/* Copy button below the response box */}
      {aiResponse && (
        <div className="mt-3">
          <button
            onClick={handleCopyResponse}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white border border-gold/30 rounded-md hover:bg-gold/10 transition-colors shadow-sm"
            disabled={copied}
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      <style jsx>{`
        .formatted-content {
          font-family: inherit;
          line-height: 1.6;
        }

        .formatted-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          color: #1a1a1a;
        }

        .formatted-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          color: #1a1a1a;
        }

        .formatted-content h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          color: #1a1a1a;
        }

        .formatted-content p {
          margin: 0.5em 0;
        }

        .formatted-content ul, .formatted-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }

        .formatted-content ul {
          list-style-type: disc;
        }

        .formatted-content ol {
          list-style-type: decimal;
        }

        .formatted-content li {
          margin: 0.5em 0;
        }

        .formatted-content strong, .formatted-content b {
          font-weight: bold;
        }

        .formatted-content em, .formatted-content i {
          font-style: italic;
        }

        .formatted-content u {
          text-decoration: underline;
        }

        .custom-scroll::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background: #c4a053;
          border-radius: 4px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #a88841;
        }
      `}</style>
    </div>
  );
};

export default ViewResponse;
