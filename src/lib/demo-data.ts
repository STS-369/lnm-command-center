// Synthetic demo dataset for the PUBLIC portfolio demo of LNM Command Center.
// Every business, person, phone number, and email address below is FICTIONAL.
// Phones use the reserved 555-01XX block; emails and websites use example.com.
// NEVER place real lead data in this file — the public-build guard fails on it.

export interface DemoLead {
  id: string; name: string; company: string; email: string; phone: string;
  website: string; city: string; state: string; industry: string;
  source: string; status: string; score: number; rating?: number | null;
  user_ratings_total?: number | null; address?: string | null;
  category?: string | null; website_status?: string | null;
  created_at: string; updated_at: string;
}

export interface DemoEmail {
  id: string; lead_id: string; lead_name: string; subject: string; body: string;
  html_body?: string; status: string; sent_at: string | null; opened_at: string | null;
  created_at: string;
}

export interface DemoDossier {
  id: string; lead_id: string; business_name: string; industry: string;
  location: string; website: string; phone: string; owner_name: string;
  owner_title: string; contact_email: string; technology_stack: string[];
  pain_points: string[]; opportunities: string[]; confidence_score: number;
  research_sources: { label: string; url: string }[]; notes: string;
  created_at: string; updated_at: string;
}

export const DEMO_LEADS_DATA: DemoLead[] = [
 {
  "id": "df1a9472-24c3-59a0-9de4-a394824a44b6",
  "name": "Aurora Bike Collective",
  "company": "Aurora Bike Collective",
  "email": "hello@aurorabikecollective.example.com",
  "phone": "(503) 555-0100",
  "website": "https://aurorabikecollective.example.com",
  "city": "Portland OR",
  "state": "OR",
  "industry": "bike shops",
  "source": "demo_seed",
  "status": "qualified",
  "score": 91,
  "rating": 4.8,
  "user_ratings_total": 132,
  "address": "100 Alder St, Portland, OR",
  "category": "bike shops",
  "website_status": "REACHABLE",
  "created_at": "2026-08-01T10:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "0f68df2d-749c-55fc-a6ef-28d08c7691e7",
  "name": "Nebula Coffee Roasters",
  "company": "Nebula Coffee Roasters",
  "email": "hello@nebulacoffeeroasters.example.com",
  "phone": "(303) 555-0101",
  "website": "https://nebulacoffeeroasters.example.com",
  "city": "Denver CO",
  "state": "CO",
  "industry": "coffee roasters",
  "source": "demo_seed",
  "status": "new",
  "score": 88,
  "rating": 4.9,
  "user_ratings_total": 210,
  "address": "107 Larkspur Ln, Denver, CO",
  "category": "coffee roasters",
  "website_status": "REACHABLE",
  "created_at": "2026-08-02T10:01:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "d7f32db9-20c5-58c5-8382-ac156f59f140",
  "name": "Prism Bookstore",
  "company": "Prism Bookstore",
  "email": "hello@prismbookstore.example.com",
  "phone": "(828) 555-0102",
  "website": "https://prismbookstore.example.com",
  "city": "Asheville NC",
  "state": "NC",
  "industry": "bookstores",
  "source": "demo_seed",
  "status": "contacted",
  "score": 74,
  "rating": 4.7,
  "user_ratings_total": 96,
  "address": "114 Basalt Ave, Asheville, NC",
  "category": "bookstores",
  "website_status": "REACHABLE",
  "created_at": "2026-08-03T10:02:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "ef40337b-fa56-55b2-81cd-1e4a7e30babd",
  "name": "Cascade Fern Plant Shop",
  "company": "Cascade Fern Plant Shop",
  "email": "hello@cascadefernplantshop.example.com",
  "phone": "(360) 555-0103",
  "website": "https://cascadefernplantshop.example.com",
  "city": "Olympia WA",
  "state": "WA",
  "industry": "plant shops",
  "source": "demo_seed",
  "status": "new",
  "score": 69,
  "rating": 4.6,
  "user_ratings_total": 58,
  "address": "121 Cedar Loop, Olympia, WA",
  "category": "plant shops",
  "website_status": "REACHABLE",
  "created_at": "2026-08-04T10:03:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "a5fbb761-029b-5508-98c4-02147c6ae962",
  "name": "Solstice Yoga Studio",
  "company": "Solstice Yoga Studio",
  "email": "hello@solsticeyogastudio.example.com",
  "phone": "(520) 555-0104",
  "website": "https://solsticeyogastudio.example.com",
  "city": "Tucson AZ",
  "state": "AZ",
  "industry": "yoga studios",
  "source": "demo_seed",
  "status": "proposal",
  "score": 84,
  "rating": 4.9,
  "user_ratings_total": 145,
  "address": "128 Foxglove Way, Tucson, AZ",
  "category": "yoga studios",
  "website_status": "REACHABLE",
  "created_at": "2026-08-05T10:04:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "ab72f5bc-d6b3-52bb-9ea8-e1f67b87e167",
  "name": "Driftwood Coffee House",
  "company": "Driftwood Coffee House",
  "email": "hello@driftwoodcoffeehouse.example.com",
  "phone": "(707) 555-0105",
  "website": "",
  "city": "Crescent City CA",
  "state": "CA",
  "industry": "coffee shops",
  "source": "demo_seed",
  "status": "new",
  "score": 63,
  "rating": 4.5,
  "user_ratings_total": 77,
  "address": "135 Granite Rd, Crescent City, CA",
  "category": "coffee shops",
  "website_status": "UNREACHABLE",
  "created_at": "2026-08-06T10:05:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "9d9e62a4-0ceb-5dac-86fa-b09aa22b1f17",
  "name": "Halcyon Tea House",
  "company": "Halcyon Tea House",
  "email": "hello@halcyonteahouse.example.com",
  "phone": "(608) 555-0106",
  "website": "https://halcyonteahouse.example.com",
  "city": "Madison WI",
  "state": "WI",
  "industry": "tea houses",
  "source": "demo_seed",
  "status": "contacted",
  "score": 79,
  "rating": 4.8,
  "user_ratings_total": 112,
  "address": "142 Heron Dr, Madison, WI",
  "category": "tea houses",
  "website_status": "REACHABLE",
  "created_at": "2026-08-07T10:06:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "062c5a9b-6d51-52d7-aea4-778b5ab28a8f",
  "name": "Foxglove Florist",
  "company": "Foxglove Florist",
  "email": "hello@foxgloveflorist.example.com",
  "phone": "(802) 555-0107",
  "website": "https://foxgloveflorist.example.com",
  "city": "Burlington VT",
  "state": "VT",
  "industry": "florists",
  "source": "demo_seed",
  "status": "new",
  "score": 71,
  "rating": 4.7,
  "user_ratings_total": 64,
  "address": "149 Juniper Blvd, Burlington, VT",
  "category": "florists",
  "website_status": "REACHABLE",
  "created_at": "2026-08-08T10:07:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "0d4bfd19-bea6-5769-8c67-75fb40d09df1",
  "name": "Basalt Pottery Studio",
  "company": "Basalt Pottery Studio",
  "email": "hello@basaltpotterystudio.example.com",
  "phone": "(541) 555-0108",
  "website": "https://basaltpotterystudio.example.com",
  "city": "Bend OR",
  "state": "OR",
  "industry": "pottery studios",
  "source": "demo_seed",
  "status": "qualified",
  "score": 86,
  "rating": 4.9,
  "user_ratings_total": 89,
  "address": "156 Kestrel Ct, Bend, OR",
  "category": "pottery studios",
  "website_status": "REACHABLE",
  "created_at": "2026-08-09T10:08:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "5826e910-9d81-5f22-8f6b-66317010a56f",
  "name": "Meridian Bike Repair",
  "company": "Meridian Bike Repair",
  "email": "hello@meridianbikerepair.example.com",
  "phone": "(208) 555-0109",
  "website": "",
  "city": "Boise ID",
  "state": "ID",
  "industry": "bike repair",
  "source": "demo_seed",
  "status": "new",
  "score": 66,
  "rating": 4.6,
  "user_ratings_total": 103,
  "address": "163 Lupine St, Boise, ID",
  "category": "bike repair",
  "website_status": "UNREACHABLE",
  "created_at": "2026-08-10T10:09:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "b93dd1f1-89ed-50ce-8cf7-275ca59c1fc6",
  "name": "Wildflower Apiary",
  "company": "Wildflower Apiary",
  "email": "hello@wildflowerapiary.example.com",
  "phone": "(218) 555-0110",
  "website": "https://wildflowerapiary.example.com",
  "city": "Duluth MN",
  "state": "MN",
  "industry": "honey farms",
  "source": "demo_seed",
  "status": "new",
  "score": 58,
  "rating": 5.0,
  "user_ratings_total": 41,
  "address": "170 Alder St, Duluth, MN",
  "category": "honey farms",
  "website_status": "REACHABLE",
  "created_at": "2026-08-11T10:10:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "0eaed9aa-710d-5fb0-92d7-e929bb3a657b",
  "name": "Copper Kettle Bakery",
  "company": "Copper Kettle Bakery",
  "email": "hello@copperkettlebakery.example.com",
  "phone": "(423) 555-0111",
  "website": "https://copperkettlebakery.example.com",
  "city": "Chattanooga TN",
  "state": "TN",
  "industry": "bakeries",
  "source": "demo_seed",
  "status": "contacted",
  "score": 82,
  "rating": 4.8,
  "user_ratings_total": 187,
  "address": "177 Larkspur Ln, Chattanooga, TN",
  "category": "bakeries",
  "website_status": "REACHABLE",
  "created_at": "2026-08-12T10:11:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "dbb35ba9-c6aa-5f5f-82c1-8872a8795638",
  "name": "Echo Valley Records",
  "company": "Echo Valley Records",
  "email": "hello@echovalleyrecords.example.com",
  "phone": "(406) 555-0112",
  "website": "https://echovalleyrecords.example.com",
  "city": "Missoula MT",
  "state": "MT",
  "industry": "record stores",
  "source": "demo_seed",
  "status": "new",
  "score": 61,
  "rating": 4.7,
  "user_ratings_total": 73,
  "address": "184 Basalt Ave, Missoula, MT",
  "category": "record stores",
  "website_status": "REACHABLE",
  "created_at": "2026-08-13T10:12:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "03098b5a-5220-5633-99c4-107c9111fb19",
  "name": "Juniper & Sage Landscaping",
  "company": "Juniper & Sage Landscaping",
  "email": "hello@junipersagelandscaping.example.com",
  "phone": "(505) 555-0113",
  "website": "https://junipersagelandscaping.example.com",
  "city": "Albuquerque NM",
  "state": "NM",
  "industry": "landscaping",
  "source": "demo_seed",
  "status": "qualified",
  "score": 77,
  "rating": 4.5,
  "user_ratings_total": 129,
  "address": "191 Cedar Loop, Albuquerque, NM",
  "category": "landscaping",
  "website_status": "REACHABLE",
  "created_at": "2026-08-14T10:13:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "c776dc91-4407-58f4-9d49-be306f284d62",
  "name": "Lighthouse Print Shop",
  "company": "Lighthouse Print Shop",
  "email": "hello@lighthouseprintshop.example.com",
  "phone": "(607) 555-0114",
  "website": "",
  "city": "Ithaca NY",
  "state": "NY",
  "industry": "print shops",
  "source": "demo_seed",
  "status": "new",
  "score": 64,
  "rating": 4.6,
  "user_ratings_total": 52,
  "address": "198 Foxglove Way, Ithaca, NY",
  "category": "print shops",
  "website_status": "UNREACHABLE",
  "created_at": "2026-08-15T10:14:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "6b5a4269-ea92-5890-9083-99698f442875",
  "name": "Meadowlark Cheese Shop",
  "company": "Meadowlark Cheese Shop",
  "email": "hello@meadowlarkcheeseshop.example.com",
  "phone": "(479) 555-0115",
  "website": "https://meadowlarkcheeseshop.example.com",
  "city": "Fayetteville AR",
  "state": "AR",
  "industry": "cheese shops",
  "source": "demo_seed",
  "status": "contacted",
  "score": 80,
  "rating": 4.9,
  "user_ratings_total": 68,
  "address": "205 Granite Rd, Fayetteville, AR",
  "category": "cheese shops",
  "website_status": "REACHABLE",
  "created_at": "2026-08-16T10:15:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "1aa030c2-ed61-5155-9ccd-fa41b84c4109",
  "name": "North Star Mountaineering",
  "company": "North Star Mountaineering",
  "email": "hello@northstarmountaineering.example.com",
  "phone": "(509) 555-0116",
  "website": "https://northstarmountaineering.example.com",
  "city": "Spokane WA",
  "state": "WA",
  "industry": "outdoor gear",
  "source": "demo_seed",
  "status": "new",
  "score": 85,
  "rating": 4.8,
  "user_ratings_total": 156,
  "address": "212 Heron Dr, Spokane, WA",
  "category": "outdoor gear",
  "website_status": "REACHABLE",
  "created_at": "2026-08-17T10:16:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "b01659df-f02a-5663-990b-7afad8be245a",
  "name": "Old Growth Woodworks",
  "company": "Old Growth Woodworks",
  "email": "hello@oldgrowthwoodworks.example.com",
  "phone": "(707) 555-0117",
  "website": "",
  "city": "Eureka CA",
  "state": "CA",
  "industry": "woodworking",
  "source": "demo_seed",
  "status": "new",
  "score": 59,
  "rating": 4.7,
  "user_ratings_total": 45,
  "address": "219 Juniper Blvd, Eureka, CA",
  "category": "woodworking",
  "website_status": "UNREACHABLE",
  "created_at": "2026-08-18T10:17:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "a76e775d-96f5-5df4-bcbe-514afb547a4b",
  "name": "Paper Crane Bookbindery",
  "company": "Paper Crane Bookbindery",
  "email": "hello@papercranebookbindery.example.com",
  "phone": "(518) 555-0118",
  "website": "https://papercranebookbindery.example.com",
  "city": "Hudson NY",
  "state": "NY",
  "industry": "bookbinders",
  "source": "demo_seed",
  "status": "new",
  "score": 55,
  "rating": 4.9,
  "user_ratings_total": 37,
  "address": "226 Kestrel Ct, Hudson, NY",
  "category": "bookbinders",
  "website_status": "REACHABLE",
  "created_at": "2026-08-19T10:18:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "a485d5a2-f00b-5fb0-a230-6a0407ed892c",
  "name": "Quartz Stone Supply",
  "company": "Quartz Stone Supply",
  "email": "hello@quartzstonesupply.example.com",
  "phone": "(432) 555-0119",
  "website": "https://quartzstonesupply.example.com",
  "city": "Marfa TX",
  "state": "TX",
  "industry": "building supplies",
  "source": "demo_seed",
  "status": "contacted",
  "score": 70,
  "rating": 4.4,
  "user_ratings_total": 61,
  "address": "233 Lupine St, Marfa, TX",
  "category": "building supplies",
  "website_status": "REACHABLE",
  "created_at": "2026-08-20T10:19:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "c41afbf6-eb86-5698-8569-8c084918c55e",
  "name": "Riverbend Urban Farm",
  "company": "Riverbend Urban Farm",
  "email": "hello@riverbendurbanfarm.example.com",
  "phone": "(912) 555-0120",
  "website": "https://riverbendurbanfarm.example.com",
  "city": "Savannah GA",
  "state": "GA",
  "industry": "urban farms",
  "source": "demo_seed",
  "status": "proposal",
  "score": 89,
  "rating": 4.8,
  "user_ratings_total": 94,
  "address": "240 Alder St, Savannah, GA",
  "category": "urban farms",
  "website_status": "REACHABLE",
  "created_at": "2026-08-21T10:20:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "a113c4d9-d941-567f-a449-8a24bc6ccb40",
  "name": "Starling Coffee Collective",
  "company": "Starling Coffee Collective",
  "email": "hello@starlingcoffeecollective.example.com",
  "phone": "(575) 555-0121",
  "website": "https://starlingcoffeecollective.example.com",
  "city": "Taos NM",
  "state": "NM",
  "industry": "coffee shops",
  "source": "demo_seed",
  "status": "new",
  "score": 76,
  "rating": 4.7,
  "user_ratings_total": 121,
  "address": "247 Larkspur Ln, Taos, NM",
  "category": "coffee shops",
  "website_status": "REACHABLE",
  "created_at": "2026-08-22T10:21:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "c32b011d-e60c-59d2-b6b2-750dd7502d01",
  "name": "Twilight Vinyl Bar",
  "company": "Twilight Vinyl Bar",
  "email": "hello@twilightvinylbar.example.com",
  "phone": "(815) 555-0122",
  "website": "",
  "city": "Galena IL",
  "state": "IL",
  "industry": "nightlife",
  "source": "demo_seed",
  "status": "new",
  "score": 67,
  "rating": 4.6,
  "user_ratings_total": 83,
  "address": "254 Basalt Ave, Galena, IL",
  "category": "nightlife",
  "website_status": "UNREACHABLE",
  "created_at": "2026-08-23T10:22:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "113381e0-02ae-58ec-ba87-15ebc7239620",
  "name": "Umber Clay Studio",
  "company": "Umber Clay Studio",
  "email": "hello@umberclaystudio.example.com",
  "phone": "(520) 555-0123",
  "website": "https://umberclaystudio.example.com",
  "city": "Bisbee AZ",
  "state": "AZ",
  "industry": "art studios",
  "source": "demo_seed",
  "status": "qualified",
  "score": 81,
  "rating": 4.9,
  "user_ratings_total": 49,
  "address": "261 Cedar Loop, Bisbee, AZ",
  "category": "art studios",
  "website_status": "REACHABLE",
  "created_at": "2026-08-24T10:23:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "504c2dbb-28ce-50b9-8314-8b4224b150df",
  "name": "Velvet Antler Ceramics",
  "company": "Velvet Antler Ceramics",
  "email": "hello@velvetantlerceramics.example.com",
  "phone": "(207) 555-0124",
  "website": "https://velvetantlerceramics.example.com",
  "city": "Belfast ME",
  "state": "ME",
  "industry": "ceramics",
  "source": "demo_seed",
  "status": "contacted",
  "score": 78,
  "rating": 4.8,
  "user_ratings_total": 72,
  "address": "268 Foxglove Way, Belfast, ME",
  "category": "ceramics",
  "website_status": "REACHABLE",
  "created_at": "2026-08-25T10:24:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 }
];

export const DEMO_EMAILS_DATA: DemoEmail[] = [
 {
  "id": "bc81052a-d5f0-588c-b42c-c9dd8dd1021a",
  "lead_id": "df1a9472-24c3-59a0-9de4-a394824a44b6",
  "lead_name": "Aurora Bike Collective",
  "subject": "Your 4.8\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Aurora Bike Collective while looking at bike shops in Portland and noticed your 4.8\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Aurora Bike Collective?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-01T15:00:00.000Z"
 },
 {
  "id": "fc66320e-4261-5187-9e06-98291bb5a00d",
  "lead_id": "0f68df2d-749c-55fc-a6ef-28d08c7691e7",
  "lead_name": "Nebula Coffee Roasters",
  "subject": "Your 4.9\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Nebula Coffee Roasters while looking at coffee roasters in Denver and noticed your 4.9\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Nebula Coffee Roasters?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-03T15:07:00.000Z"
 },
 {
  "id": "c0bc923a-c536-57ad-b33b-2de38a58286e",
  "lead_id": "d7f32db9-20c5-58c5-8382-ac156f59f140",
  "lead_name": "Prism Bookstore",
  "subject": "Your 4.7\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Prism Bookstore while looking at bookstores in Asheville and noticed your 4.7\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Prism Bookstore?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-05T15:14:00.000Z"
 },
 {
  "id": "10436adc-5505-533f-9c59-ba773e9a9bd7",
  "lead_id": "ef40337b-fa56-55b2-81cd-1e4a7e30babd",
  "lead_name": "Cascade Fern Plant Shop",
  "subject": "Your 4.6\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Cascade Fern Plant Shop while looking at plant shops in Olympia and noticed your 4.6\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Cascade Fern Plant Shop?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-07T15:21:00.000Z"
 },
 {
  "id": "b7466aa9-3cad-5d78-8e47-43ed5b177763",
  "lead_id": "a5fbb761-029b-5508-98c4-02147c6ae962",
  "lead_name": "Solstice Yoga Studio",
  "subject": "Your 4.9\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Solstice Yoga Studio while looking at yoga studios in Tucson and noticed your 4.9\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Solstice Yoga Studio?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-09T15:28:00.000Z"
 },
 {
  "id": "4609c059-ed16-547e-9d36-8fe336017850",
  "lead_id": "ab72f5bc-d6b3-52bb-9ea8-e1f67b87e167",
  "lead_name": "Driftwood Coffee House",
  "subject": "Your 4.5\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Driftwood Coffee House while looking at coffee shops in Crescent and noticed your 4.5\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Driftwood Coffee House?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-11T15:35:00.000Z"
 },
 {
  "id": "a8807399-1c08-58dd-80a3-b333950a7780",
  "lead_id": "9d9e62a4-0ceb-5dac-86fa-b09aa22b1f17",
  "lead_name": "Halcyon Tea House",
  "subject": "Your 4.8\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Halcyon Tea House while looking at tea houses in Madison and noticed your 4.8\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Halcyon Tea House?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-13T15:42:00.000Z"
 },
 {
  "id": "1de05bad-21dc-5bc3-9aad-a27d9c24b0d9",
  "lead_id": "062c5a9b-6d51-52d7-aea4-778b5ab28a8f",
  "lead_name": "Foxglove Florist",
  "subject": "Your 4.7\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Foxglove Florist while looking at florists in Burlington and noticed your 4.7\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Foxglove Florist?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-15T15:49:00.000Z"
 },
 {
  "id": "d82b65f8-3b1b-53ba-9bce-9bb300e3af6e",
  "lead_id": "0d4bfd19-bea6-5769-8c67-75fb40d09df1",
  "lead_name": "Basalt Pottery Studio",
  "subject": "Your 4.9\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Basalt Pottery Studio while looking at pottery studios in Bend and noticed your 4.9\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Basalt Pottery Studio?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-17T15:56:00.000Z"
 },
 {
  "id": "d4e7fd80-2729-51be-9539-26c68772b999",
  "lead_id": "5826e910-9d81-5f22-8f6b-66317010a56f",
  "lead_name": "Meridian Bike Repair",
  "subject": "Your 4.6\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Meridian Bike Repair while looking at bike repair in Boise and noticed your 4.6\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Meridian Bike Repair?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-19T15:03:00.000Z"
 },
 {
  "id": "200b0ae1-78de-56b9-84ca-984101f8a330",
  "lead_id": "b93dd1f1-89ed-50ce-8cf7-275ca59c1fc6",
  "lead_name": "Wildflower Apiary",
  "subject": "Your 5.0\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Wildflower Apiary while looking at honey farms in Duluth and noticed your 5.0\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Wildflower Apiary?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-21T15:10:00.000Z"
 },
 {
  "id": "a4f72f9c-836d-5907-a8d4-3b8bdb24827a",
  "lead_id": "0eaed9aa-710d-5fb0-92d7-e929bb3a657b",
  "lead_name": "Copper Kettle Bakery",
  "subject": "Your 4.8\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Copper Kettle Bakery while looking at bakeries in Chattanooga and noticed your 4.8\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Copper Kettle Bakery?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-23T15:17:00.000Z"
 },
 {
  "id": "bb53fe93-3730-5d90-a697-7bbf66ee1f08",
  "lead_id": "dbb35ba9-c6aa-5f5f-82c1-8872a8795638",
  "lead_name": "Echo Valley Records",
  "subject": "Your 4.7\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Echo Valley Records while looking at record stores in Missoula and noticed your 4.7\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Echo Valley Records?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-25T15:24:00.000Z"
 },
 {
  "id": "ff464d9a-2014-57e4-a6aa-58445eb0fc84",
  "lead_id": "03098b5a-5220-5633-99c4-107c9111fb19",
  "lead_name": "Juniper & Sage Landscaping",
  "subject": "Your 4.5\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Juniper & Sage Landscaping while looking at landscaping in Albuquerque and noticed your 4.5\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Juniper & Sage Landscaping?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-27T15:31:00.000Z"
 },
 {
  "id": "39ed59ad-e9d2-5bf2-8ef2-def3bedb6251",
  "lead_id": "c776dc91-4407-58f4-9d49-be306f284d62",
  "lead_name": "Lighthouse Print Shop",
  "subject": "Your 4.6\u2605 reputation deserves an easier booking experience",
  "body": "Hi there.\n\nI came across Lighthouse Print Shop while looking at print shops in Ithaca and noticed your 4.6\u2605 rating \u2014 clearly your customers love what you do.\n\nI didn't see online scheduling on your website. What if customers could book, reorder, or reserve any time \u2014 even at 2am \u2014 instead of waiting for a call back? Most small teams we work with recover several missed orders a week with a simple booking flow.\n\nWould you be open to a 15-minute conversation about what that could look like for Lighthouse Print Shop?\n\n\u2014 Sam Rivera, SOETech (this is a demo draft with fictional data)",
  "status": "draft",
  "sent_at": null,
  "opened_at": null,
  "created_at": "2026-08-01T15:38:00.000Z"
 }
];

export const DEMO_DOSSIERS_DATA: DemoDossier[] = [
 {
  "id": "4e15be68-52a7-5148-bedb-57836e0783a9",
  "lead_id": "df1a9472-24c3-59a0-9de4-a394824a44b6",
  "business_name": "Aurora Bike Collective",
  "industry": "Bike Shops",
  "location": "100 Alder St, Portland, OR",
  "website": "https://aurorabikecollective.example.com",
  "phone": "(503) 555-0100",
  "owner_name": "Maya Chen (Owner & Head Mechanic)",
  "owner_title": "Owner & Head Mechanic",
  "contact_email": "hello@aurorabikecollective.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 60,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/aurorabikecollective"
   },
   {
    "label": "Business site (demo)",
    "url": "https://aurorabikecollective.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "169a0d92-0408-5616-a6bc-365cfcab69b8",
  "lead_id": "0f68df2d-749c-55fc-a6ef-28d08c7691e7",
  "business_name": "Nebula Coffee Roasters",
  "industry": "Coffee Roasters",
  "location": "107 Larkspur Ln, Denver, CO",
  "website": "https://nebulacoffeeroasters.example.com",
  "phone": "(303) 555-0101",
  "owner_name": "Dele Okafor (Founder / Head Roaster)",
  "owner_title": "Founder / Head Roaster",
  "contact_email": "hello@nebulacoffeeroasters.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 65,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/nebulacoffeeroasters"
   },
   {
    "label": "Business site (demo)",
    "url": "https://nebulacoffeeroasters.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "f45fc0f1-27e4-5a97-8212-170358b459ae",
  "lead_id": "d7f32db9-20c5-58c5-8382-ac156f59f140",
  "business_name": "Prism Bookstore",
  "industry": "Bookstores",
  "location": "114 Basalt Ave, Asheville, NC",
  "website": "https://prismbookstore.example.com",
  "phone": "(828) 555-0102",
  "owner_name": "June Castellano (Owner)",
  "owner_title": "Owner",
  "contact_email": "hello@prismbookstore.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 70,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/prismbookstore"
   },
   {
    "label": "Business site (demo)",
    "url": "https://prismbookstore.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "e0a7c92f-bd78-5621-8719-a3e6a5acd136",
  "lead_id": "a5fbb761-029b-5508-98c4-02147c6ae962",
  "business_name": "Solstice Yoga Studio",
  "industry": "Yoga Studios",
  "location": "128 Foxglove Way, Tucson, AZ",
  "website": "https://solsticeyogastudio.example.com",
  "phone": "(520) 555-0104",
  "owner_name": "Priya Raman (Owner & Lead Instructor)",
  "owner_title": "Owner & Lead Instructor",
  "contact_email": "hello@solsticeyogastudio.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 75,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/solsticeyogastudio"
   },
   {
    "label": "Business site (demo)",
    "url": "https://solsticeyogastudio.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "73ce5031-7780-584d-96cc-9678814e0a79",
  "lead_id": "0d4bfd19-bea6-5769-8c67-75fb40d09df1",
  "business_name": "Basalt Pottery Studio",
  "industry": "Pottery Studios",
  "location": "156 Kestrel Ct, Bend, OR",
  "website": "https://basaltpotterystudio.example.com",
  "phone": "(541) 555-0108",
  "owner_name": "Tom\u00e1s Ibarra (Founder / Studio Lead)",
  "owner_title": "Founder / Studio Lead",
  "contact_email": "hello@basaltpotterystudio.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 80,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/basaltpotterystudio"
   },
   {
    "label": "Business site (demo)",
    "url": "https://basaltpotterystudio.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "2d249f45-b6e4-5e63-be1a-aae38694f854",
  "lead_id": "0eaed9aa-710d-5fb0-92d7-e929bb3a657b",
  "business_name": "Copper Kettle Bakery",
  "industry": "Bakeries",
  "location": "177 Larkspur Ln, Chattanooga, TN",
  "website": "https://copperkettlebakery.example.com",
  "phone": "(423) 555-0111",
  "owner_name": "Greta Lindqvist (Owner / Head Baker)",
  "owner_title": "Owner / Head Baker",
  "contact_email": "hello@copperkettlebakery.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 85,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/copperkettlebakery"
   },
   {
    "label": "Business site (demo)",
    "url": "https://copperkettlebakery.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "b7746eaf-2c23-50ff-92a8-051ba253bc13",
  "lead_id": "1aa030c2-ed61-5155-9ccd-fa41b84c4109",
  "business_name": "North Star Mountaineering",
  "industry": "Outdoor Gear",
  "location": "212 Heron Dr, Spokane, WA",
  "website": "https://northstarmountaineering.example.com",
  "phone": "(509) 555-0116",
  "owner_name": "Marcus Whitfield (Owner / Guide)",
  "owner_title": "Owner / Guide",
  "contact_email": "hello@northstarmountaineering.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 90,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/northstarmountaineering"
   },
   {
    "label": "Business site (demo)",
    "url": "https://northstarmountaineering.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 },
 {
  "id": "2aa048be-a0f1-5a5f-ae5d-a3d653fc69f4",
  "lead_id": "c41afbf6-eb86-5698-8569-8c084918c55e",
  "business_name": "Riverbend Urban Farm",
  "industry": "Urban Farms",
  "location": "240 Alder St, Savannah, GA",
  "website": "https://riverbendurbanfarm.example.com",
  "phone": "(912) 555-0120",
  "owner_name": "Ana Sofia Duarte (Founder / Farm Manager)",
  "owner_title": "Founder / Farm Manager",
  "contact_email": "hello@riverbendurbanfarm.example.com",
  "technology_stack": [
   "Website: static brochure site (demo fictional data)",
   "Booking: phone-only scheduling observed",
   "Marketing: Instagram + word of mouth"
  ],
  "pain_points": [
   "No online booking \u2014 after-hours demand goes unanswered",
   "Manual scheduling eats several staff hours per week",
   "Website not optimized for mobile search"
  ],
  "opportunities": [
   "24/7 online booking could capture missed orders",
   "Automated reminders could reduce no-shows",
   "A refreshed mobile-first site would convert search traffic"
  ],
  "confidence_score": 95,
  "research_sources": [
   {
    "label": "Google Maps (demo)",
    "url": "https://maps.example.com/riverbendurbanfarm"
   },
   {
    "label": "Business site (demo)",
    "url": "https://riverbendurbanfarm.example.com"
   }
  ],
  "notes": "FICTIONAL demo dossier \u2014 all details invented for the public portfolio demo.",
  "created_at": "2026-08-20T09:00:00.000Z",
  "updated_at": "2026-09-01T14:00:00.000Z"
 }
];

export const IMPORT_STATS = {
  totalLeads: 25,
  totalEmails: 15,
  matchedEmails: 15,
  unmatchedEmails: 0,
  cities: ["Albuquerque NM", "Asheville NC", "Belfast ME", "Bend OR", "Bisbee AZ", "Boise ID", "Burlington VT", "Chattanooga TN", "Crescent City CA", "Denver CO", "Duluth MN", "Eureka CA", "Fayetteville AR", "Galena IL", "Hudson NY", "Ithaca NY", "Madison WI", "Marfa TX", "Missoula MT", "Olympia WA", "Portland OR", "Savannah GA", "Spokane WA", "Taos NM", "Tucson AZ"],
  categories: ["art studios", "bakeries", "bike repair", "bike shops", "bookbinders", "bookstores", "building supplies", "ceramics", "cheese shops", "coffee roasters", "coffee shops", "florists", "honey farms", "landscaping", "nightlife", "outdoor gear", "plant shops", "pottery studios", "print shops", "record stores", "tea houses", "urban farms", "woodworking", "yoga studios"],
};

export type ImportLead = DemoLead;
export type ImportEmail = DemoEmail;
