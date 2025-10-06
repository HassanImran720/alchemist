// import { NextRequest, NextResponse } from 'next/server'

// export async function GET(request: NextRequest) {
//   const token = process.env.MAILERLITE_TOKEN;
  
//   if (!token) {
//     return NextResponse.json(
//       { error: "Missing MAILERLITE_TOKEN in environment" }, 
//       { status: 500 }
//     );
//   }

//   try {
//     // MailerLite v2 API endpoint to fetch campaigns
//     const response = await fetch("https://connect.mailerlite.com/api/campaigns", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           error: "MailerLite error",
//           details: data,
//         },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: "Server error", details: err.message },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = process.env.MAILERLITE_TOKEN;
  
  if (!token) {
    return NextResponse.json(
      { error: "Missing MAILERLITE_TOKEN in environment" }, 
      { status: 500 }
    );
  }

  try {
    // Get URL search params for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'sent';
    const limit = searchParams.get('limit') || '25';
    const page = searchParams.get('page') || '1';

    // Fetch all sent campaigns with pagination
    let allCampaigns: any[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      const apiUrl = new URL("https://connect.mailerlite.com/api/campaigns");
      apiUrl.searchParams.set('filter[status]', status);
      apiUrl.searchParams.set('limit', limit);
      apiUrl.searchParams.set('page', currentPage.toString());

      console.log('Fetching:', apiUrl.toString());

      const response = await fetch(apiUrl.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return NextResponse.json(
          {
            error: "MailerLite error",
            details: data,
          },
          { status: response.status }
        );
      }

      // Add campaigns from current page
      if (data.data && Array.isArray(data.data)) {
        allCampaigns = [...allCampaigns, ...data.data];
      }

      // Update pagination info
      totalPages = data.meta?.last_page || 1;
      currentPage++;

      console.log(`Page ${currentPage - 1}/${totalPages} - Found ${data.data?.length || 0} campaigns`);

    } while (currentPage <= totalPages);

    // Return all campaigns with metadata
    return NextResponse.json({
      data: allCampaigns,
      total: allCampaigns.length,
      status_filter: status,
      meta: {
        total_campaigns: allCampaigns.length,
        pages_fetched: totalPages,
        status_requested: status
      }
    });

  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}