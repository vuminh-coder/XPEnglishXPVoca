async function inspectVideo(id) {
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
    if (!res.ok) return { id, error: res.status };
    const data = await res.json();
    return {
      id,
      title: data.title,
      author: data.author_name,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    };
  } catch (e) {
    return { id, error: e.message };
  }
}

async function run() {
  const testIds = [
    '5MuIMqhT8DM', // Matt Walker TED Sleep
    'SlTrn13aez4', // Oxford Online English Food & Cooking
    '64R2MYUt394', // David Attenborough A Life On Our Planet
    'ml8HHHgDxiE', // CareerVidz Tell Me About Yourself
    '4ld9EP5yAX4', // Anton Ego Ratatouille
    'DOgVUMfcb7U', // Warren Buffett Money
  ];

  for (const id of testIds) {
    const info = await inspectVideo(id);
    console.log(info);
  }
}

run();
