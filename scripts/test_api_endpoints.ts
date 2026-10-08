async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/video-catalog/lessons');
    if (!res.ok) {
      console.log('HTTP status:', res.status);
      return;
    }
    const data: any = await res.json();
    console.log('API /api/video-catalog/lessons returned count:', data?.data?.length || data?.length);

    // Test individual lesson fetch
    const testId = 'vid_airport_checkin';
    const resLesson = await fetch(`http://localhost:3000/api/video-catalog/lessons/${testId}`);
    const dataLesson: any = await resLesson.json();
    console.log(`API /api/video-catalog/lessons/${testId} success:`, !!dataLesson?.data || !!dataLesson?.lesson);
  } catch (err: any) {
    console.log('API fetch test note:', err?.message);
  }
}
testApi();
