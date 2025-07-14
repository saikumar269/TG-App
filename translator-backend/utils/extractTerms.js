const stopwords = ['the', 'and', 'a', 'to', 'in', 'of', 'is', 'on', 'for', 'this', 'that', 'are'];

function extractTerms(text) {
  if (!text) return [];

  const words = text
    .toLowerCase()
    .replace(/[.,!?;:"()]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopwords.includes(word));

  const unique = [...new Set(words)];

  return unique.slice(0, 50); // limit to top 50 terms
}

module.exports = extractTerms;
