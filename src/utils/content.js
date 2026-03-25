import { slugify } from './helpers';

export const getCollegeRouteParam = (college) => college.slug || college._id;

export const resolveMediaUrl = (media, fallback = '') => {
  if (!media) return fallback;
  if (typeof media === 'string') return media;
  if (media.url) return media.url;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (cloudName && media.provider === 'cloudinary' && media.publicId) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${media.publicId}`;
  }

  return fallback;
};

export const normalizeCollege = (college) => {
  if (!college) return null;

  const courses = college.course || college.courses || [];
  const firstCourse = courses[0] || {};

  return {
    ...college,
    slug: college.slug || slugify(college.name),
    image: Array.isArray(college.image) ? college.image : [],
    location: college.location || { city: college.city || '', state: college.state || '' },
    rating: college.rating || 4.6,
    ranking: college.ranking || (college.nirfRank ? { authority: 'NIRF', rank: college.nirfRank, year: 2025 } : null),
    ownership: college.ownership || (college.category?.toLowerCase().includes('private') ? 'Private' : 'Government'),
    course: courses.map((courseItem) => ({
      ...courseItem,
      courseName: courseItem.courseName || courseItem.name || 'Program details coming soon',
      fee: courseItem.fee || courseItem.totalFees || courseItem.fees?.min || 'N/A',
      duration: courseItem.duration || 'Varies',
      placement: courseItem.placement || college.averagePlacement || 'Placement data on request',
      eligibility: courseItem.eligibility || 'As per institute norms',
    })),
    totalFees: college.totalFees || firstCourse.fee || 'N/A',
    averagePlacement: college.averagePlacement || college.placements?.avg || firstCourse.placement || 'On request',
    highestPackage: college.highestPackage || college.placements?.highest || 'On request',
    highlights: college.highlights || [],
    tags: college.tags || [],
  };
};

export const mergeWithFallback = (primary = [], fallback = [], targetCount = 10) => {
  const seen = new Set();
  const merged = [];

  [...primary, ...fallback].forEach((item) => {
    const key = item.slug || item._id || item.name;
    if (!key || seen.has(key) || merged.length >= targetCount) return;
    seen.add(key);
    merged.push(item);
  });

  return merged;
};

export const paginateItems = (items = [], page = 1, perPage = 9) => {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const currentPage = Math.min(Math.max(page, 1), pages);
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    pagination: {
      page: currentPage,
      pages,
      total,
      limit: perPage,
    },
  };
};
