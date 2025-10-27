// GROQ queries for Sanity data fetching

// Property queries
export const PROPERTY_FIELDS = `
  _id,
  title,
  slug,
  price,
  type,
  status,
  bedrooms,
  bathrooms,
  buildingSize,
  landSize,
  certificate,
  city,
  province,
  address,
  location,
  "photos": photos[]{
    "url": asset->url,
    "alt": alt
  },
  amenities,
  neighborhood,
  yearBuilt,
  facing,
  description,
  featured,
  listedAt
`;

export const PROPERTY_WITH_AGENT = `
  ${PROPERTY_FIELDS},
  "agent": agent->{
    _id,
    name,
    phone,
    whatsapp,
    email,
    "avatar": avatar.asset->url,
    office,
    verified
  }
`;

// Get all properties with filters - SIMPLIFIED VERSION
export const GET_PROPERTIES = `
  *[_type == "property" && status in ["sale", "rent"]] | order(listedAt desc) [$cursor...$limit] {
    ${PROPERTY_FIELDS}
  }
`;

// Get properties by bounds (for map) - SIMPLIFIED VERSION
export const GET_PROPERTIES_BY_BOUNDS = `
  *[_type == "property" && status in ["sale", "rent"]
    && location.lat > $swLat && location.lat < $neLat
    && location.lng > $swLng && location.lng < $neLng
  ] [0...100] {
    ${PROPERTY_FIELDS}
  }
`;

// Get single property by slug
export const GET_PROPERTY_BY_SLUG = `
  *[_type == "property" && slug.current == $slug][0] {
    ${PROPERTY_WITH_AGENT}
  }
`;

// Get featured properties
export const GET_FEATURED_PROPERTIES = `
  *[_type == "property" && featured == true && status in ["sale", "rent"]] | order(listedAt desc) [0...$limit] {
    ${PROPERTY_FIELDS}
  }
`;

// Get recent properties
export const GET_RECENT_PROPERTIES = `
  *[_type == "property" && status in ["sale", "rent"]] | order(listedAt desc) [0...$limit] {
    ${PROPERTY_FIELDS}
  }
`;

// Get related properties
export const GET_RELATED_PROPERTIES = `
  *[_type == "property" && slug.current != $currentSlug && city == $city && type == $type && status in ["sale", "rent"]] | order(listedAt desc) [0...$limit] {
    ${PROPERTY_FIELDS}
  }
`;

// Get properties count - SIMPLIFIED VERSION
export const GET_PROPERTIES_COUNT = `
  count(*[_type == "property" && status in ["sale", "rent"]])
`;

// Get cities for filter
export const GET_CITIES = `
  array::unique(*[_type == "property" && defined(city)].city)
`;

// Get provinces for filter
export const GET_PROVINCES = `
  array::unique(*[_type == "property" && defined(province)].province)
`;

// Agent queries
export const GET_AGENT_BY_ID = `
  *[_type == "agent" && _id == $id][0] {
    _id,
    name,
    phone,
    whatsapp,
    email,
    "avatar": avatar.asset->url,
    office,
    bio,
    specializations,
    licenseNumber,
    yearsOfExperience,
    rating,
    totalReviews,
    verified,
    active
  }
`;

export const GET_ALL_AGENTS = `
  *[_type == "agent" && active == true] | order(verified desc, name asc) {
    _id,
    name,
    phone,
    whatsapp,
    email,
    "avatar": avatar.asset->url,
    office,
    verified,
    rating,
    totalReviews
  }
`;

// Article queries
export const ARTICLE_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  "cover": cover.asset->url,
  "coverAlt": cover.alt,
  category,
  author,
  publishedAt,
  tags
`;

export const GET_ARTICLES = `
  *[_type == "article"
    ${`$category != null && $category != "" => category == $category`}
    ${`$featured != null => featured == $featured`}
  ] | order(publishedAt desc) [$cursor...$limit] {
    ${ARTICLE_FIELDS}
  }
`;

export const GET_ARTICLE_BY_SLUG = `
  *[_type == "article" && slug.current == $slug][0] {
    ${ARTICLE_FIELDS},
    body,
    "relatedArticles": relatedArticles[]->{
      ${ARTICLE_FIELDS}
    },
    seo
  }
`;

export const GET_FEATURED_ARTICLES = `
  *[_type == "article" && featured == true] | order(publishedAt desc) [0...$limit] {
    ${ARTICLE_FIELDS}
  }
`;

export const GET_RECENT_ARTICLES = `
  *[_type == "article"] | order(publishedAt desc) [0...$limit] {
    ${ARTICLE_FIELDS}
  }
`;

// Lead queries
export const CREATE_LEAD = `
  {
    _type: "lead",
    name: $name,
    email: $email,
    phone: $phone,
    message: $message,
    subject: $subject,
    listingSlug: $listingSlug,
    source: $source,
    consent: $consent,
    status: "new",
    priority: "medium",
    metadata: $metadata,
    createdAt: now()
  }
`;

export const GET_LEADS = `
  *[_type == "lead"
    ${`$status != null && $status != "" => status == $status`}
    ${`$priority != null && $priority != "" => priority == $priority`}
  ] | order(createdAt desc) [$cursor...$limit] {
    _id,
    name,
    email,
    phone,
    message,
    subject,
    listingSlug,
    source,
    status,
    priority,
    "assignedTo": assignedTo->{
      _id,
      name
    },
    createdAt
  }
`;

export const GET_LEAD_BY_ID = `
  *[_type == "lead" && _id == $id][0] {
    _id,
    name,
    email,
    phone,
    message,
    subject,
    listingSlug,
    "propertyRef": propertyRef->{
      _id,
      title,
      slug
    },
    source,
    consent,
    status,
    priority,
    "assignedTo": assignedTo->{
      _id,
      name,
      email,
      phone
    },
    notes,
    metadata,
    createdAt,
    updatedAt
  }
`;

export const GET_LEADS_COUNT = `
  count(*[_type == "lead"
    ${`$status != null && $status != "" => status == $status`}
    ${`$priority != null && $priority != "" => priority == $priority`}
  ])
`;

// Site settings query
export const GET_SITE_SETTINGS = `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    siteKeywords,
    "logo": logo.asset->url,
    "ogImage": ogImage.asset->url,
    contactInfo,
    socialMedia,
    analytics,
    announcement,
    maintenance
  }
`;

// Dashboard/Admin queries
export const GET_DASHBOARD_STATS = `
  {
    "totalProperties": count(*[_type == "property"]),
    "activeProperties": count(*[_type == "property" && status in ["sale", "rent"]]),
    "totalAgents": count(*[_type == "agent"]),
    "activeAgents": count(*[_type == "agent" && active == true]),
    "totalArticles": count(*[_type == "article"]),
    "totalLeads": count(*[_type == "lead"]),
    "newLeads": count(*[_type == "lead" && status == "new"]),
    "recentLeads": *[_type == "lead"] | order(createdAt desc) [0...5] {
      _id,
      name,
      email,
      subject,
      status,
      createdAt
    },
    "recentProperties": *[_type == "property"] | order(listedAt desc) [0...5] {
      _id,
      title,
      slug,
      price,
      city,
      status,
      listedAt
    }
  }
`;

// Sitemap queries
export const GET_ALL_SLUGS_FOR_SITEMAP = `
  {
    "properties": *[_type == "property" && defined(slug.current)].slug.current,
    "articles": *[_type == "article" && defined(slug.current)].slug.current
  }
`;
