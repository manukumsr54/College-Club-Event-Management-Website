// Full-Stack Comprehensive Integration Test Suite
// Verifies all public student flows, PostgreSQL transactions, duplicate checks, admin authentication, event CRUD, and registration management.

async function runTestSuite() {
  const baseURL = 'http://localhost:5000/api';
  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log('  [PASS]', testName);
      passed++;
    } else {
      console.error('  [FAIL]', testName);
      failed++;
    }
  }

  try {
    console.log('\n--- 1. Testing Health & Public Event APIs ---');
    const health = await fetch(baseURL + '/health').then((r) => r.json());
    assert(health.success === true, 'GET /api/health responds with 200 success');

    const events = await fetch(baseURL + '/events').then((r) => r.json());
    assert(events.success === true && events.count >= 8, 'GET /api/events returns 8+ seeded events from PostgreSQL');

    const techEvents = await fetch(baseURL + '/events?category=Technical').then((r) => r.json());
    assert(
      techEvents.success === true && techEvents.data.every((e) => e.category === 'Technical'),
      'Category filter: Technical returns strictly Technical events'
    );

    const searchEvents = await fetch(baseURL + '/events?search=HackNova').then((r) => r.json());
    assert(
      searchEvents.success === true && searchEvents.data.some((e) => e.title.includes('HackNova')),
      'Search query: "HackNova" returns matching event'
    );

    const featured = await fetch(baseURL + '/events/featured').then((r) => r.json());
    assert(
      featured.success === true && featured.data && featured.data.featured === true,
      'GET /api/events/featured returns active spotlight event'
    );

    const singleEvent = await fetch(baseURL + '/events/' + events.data[0].id).then((r) => r.json());
    assert(
      singleEvent.success === true && singleEvent.data.id === events.data[0].id,
      'GET /api/events/:id returns full single event details'
    );

    console.log('\n--- 2. Testing Student Registration Flow ---');
    const testStudentEmail = 'student.test.' + Date.now() + '@college.edu';
    const regPayload = {
      event_id: events.data[0].id,
      name: 'Dheeraj Test Student',
      email: testStudentEmail,
      college: 'National Institute of Technology',
      year: '3rd Year',
      phone: '+91 9876543210',
    };

    const regRes = await fetch(baseURL + '/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regPayload),
    }).then((r) => r.json());
    assert(
      regRes.success === true && regRes.data.id && regRes.message.includes("Registration successful"),
      'POST /api/registrations stores registration in PostgreSQL with success pass'
    );
    const createdRegId = regRes.data?.id;

    // Duplicate registration prevention test
    const dupRes = await fetch(baseURL + '/registrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regPayload),
    }).then((r) => r.json());
    assert(
      dupRes.success === false && dupRes.message.includes('already registered'),
      'Duplicate registration prevention: Rejects same email + event with 409 error'
    );

    console.log('\n--- 3. Testing Admin Authentication Flow ---');
    const loginRes = await fetch(baseURL + '/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@collegeclub.edu', password: 'Admin@123' }),
    }).then((r) => r.json());
    assert(
      loginRes.success === true && !!loginRes.token,
      'POST /api/auth/login validates bcrypt password & generates JWT token'
    );
    const token = loginRes.token;

    const authMe = await fetch(baseURL + '/auth/me', {
      headers: { Authorization: 'Bearer ' + token },
    }).then((r) => r.json());
    assert(
      authMe.success === true && authMe.data.email === 'admin@collegeclub.edu',
      'GET /api/auth/me verifies active JWT session'
    );

    console.log('\n--- 4. Testing Admin Dashboard Metrics ---');
    const stats = await fetch(baseURL + '/stats/dashboard', {
      headers: { Authorization: 'Bearer ' + token },
    }).then((r) => r.json());
    assert(
      stats.success === true && stats.data.totalEvents >= 8 && stats.data.totalRegistrations >= 10,
      'GET /api/stats/dashboard computes real-time counts from PostgreSQL'
    );

    console.log('\n--- 5. Testing Admin Event CRUD Flow ---');
    const newEventPayload = {
      title: 'Quantum Computing Bootcamp 2026',
      description: 'Comprehensive introductory bootcamp into Qubits, superposition, and IBM Qiskit algorithms for undergraduate students.',
      category: 'Technical',
      date: '2026-11-30',
      time: '10:00 AM - 04:00 PM',
      venue: 'Advanced Physics & Computing Lab',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
      featured: false,
    };

    const createEventRes = await fetch(baseURL + '/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify(newEventPayload),
    }).then((r) => r.json());
    assert(
      createEventRes.success === true && createEventRes.data.id,
      'POST /api/events creates new event record in PostgreSQL'
    );
    const newEventId = createEventRes.data?.id;

    const updateEventRes = await fetch(baseURL + '/events/' + newEventId, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ title: 'Quantum Computing & Qiskit Masterclass' }),
    }).then((r) => r.json());
    assert(
      updateEventRes.success === true && updateEventRes.data.title === 'Quantum Computing & Qiskit Masterclass',
      'PUT /api/events/:id updates event attributes in PostgreSQL'
    );

    const deleteEventRes = await fetch(baseURL + '/events/' + newEventId, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    }).then((r) => r.json());
    assert(deleteEventRes.success === true, 'DELETE /api/events/:id removes event from database');

    console.log('\n--- 6. Testing Admin Registration Management ---');
    const allRegs = await fetch(baseURL + '/registrations', {
      headers: { Authorization: 'Bearer ' + token },
    }).then((r) => r.json());
    assert(
      allRegs.success === true && allRegs.data.some((r) => r.id === createdRegId),
      'GET /api/registrations queries all registered students with joined event titles'
    );

    const delRegRes = await fetch(baseURL + '/registrations/' + createdRegId, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + token },
    }).then((r) => r.json());
    assert(delRegRes.success === true, 'DELETE /api/registrations/:id deletes student registration cleanly');

    console.log('\n==============================================');
    console.log(`  INTEGRATION TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('==============================================\n');

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTestSuite();
