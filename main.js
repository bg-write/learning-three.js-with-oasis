let camera, scene, renderer, cube;

function init() {
    // Init scene. Scenes allow you to set up what and where is to be rendered by three.js. This is where you place objects, lights, and cameras.
    scene = new THREE.Scene();

    // Init camera. Here we'll use PerspectiveCamera, which uses perspective projection to mimic the way the human eye sees. PerspectiveCamera() takes in Field of View (fov), Aspect Ratio (aspect), Near Clipping Plane (near), and Far Clipping Plane (far).
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // Init renderer with antialias (making our edges smoother).
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // Set size (whole window).
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Render to our HTML canvas element.
    document.body.appendChild(renderer.domElement);

    // Init BoxGeometry object (rectangular cuboid): https://threejs.org/docs/index.html?q=BoxGeometry#api/en/geometries/BoxGeometry
    const geometry = new THREE.BoxGeometry(3, 3, 3);

    // Create material with color. (Instead of "Add texture".)
    // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // Add texture (if I'm not using a color material).
    const texture = new THREE.TextureLoader().load('textures/oasis.jpg');
    // Create material with texture.
    const material = new THREE.MeshBasicMaterial({ map: texture });

    // Create mesh with geo and material.
    cube = new THREE.Mesh(geometry, material);
    // Add to our scene.
    scene.add(cube);

    // Position camera.
    camera.position.z = 5;
}

// Draw the scene every time the screen is refreshed.
function animate() {
    requestAnimationFrame(animate);
    // Rotate cube (Change values to change speed).
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

function onWindowResize() {
    // Camera frustum aspect ratio.
    camera.aspect = window.innerWidth / window.innerHeight;
    // After making changes to aspect.
    camera.updateProjectionMatrix();
    // Reset size
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

init();
animate();