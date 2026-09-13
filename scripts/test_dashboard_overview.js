async function testDashboardOverview() {
  console.log("Testing GET http://localhost:3000/api/dashboard/overview ...");
  const t0 = performance.now();
  const res = await fetch("http://localhost:3000/api/dashboard/overview");
  const t1 = performance.now();
  const data = await res.json();
  
  console.log(`Status: ${res.status}`);
  console.log(`Time taken: ${(t1 - t0).toFixed(1)}ms`);
  console.log(`Success: ${data.success}`);
  if (data.data) {
    console.log("Keys returned:", Object.keys(data.data));
    console.log("Checkin isCheckedInToday:", data.data.checkin?.isCheckedInToday);
    console.log("Challenges count:", data.data.challenges?.length);
    console.log("StudyPlan todayTask:", data.data.studyPlan?.todayTask);
    console.log("SkillPractice skills keys:", Object.keys(data.data.skillPractice?.skills || {}));
  } else {
    console.log("Response body:", data);
  }
}

testDashboardOverview().catch(console.error);
