// Helper to format clean display names without @ or duplicate bracket usernames or raw email strings
export const formatCleanName = (name?: string) => {
  if (!name) return 'Học viên XP';
  let clean = name.trim().replace(/^@+/, '').split(' (')[0].trim();
  if (clean.includes('@')) {
    clean = clean.split('@')[0];
    clean = clean.replace(/[._-]/g, ' ');
    clean = clean
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  }
  return clean || 'Học viên XP';
};
