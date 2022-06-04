
  var Engine = Matter.Engine,
  Render = Matter.Render,
  Composites = Matter.Composites,
    Composite = Matter.Composite,
  Mouse = Matter.Mouse,
  World = Matter.World,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine = Engine.create();

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 400,
    wireframes: false
  }
});

var topWall = Bodies.rectangle(400, 50, 720, 20, { isStatic: true });
var leftWall = Bodies.rectangle(50, 210, 20, 300, { isStatic: true });
var rightWall = Bodies.rectangle(750, 210, 20, 300, { isStatic: true });
var bottomWall = Bodies.rectangle(400, 350, 720, 20, { isStatic: true });


var ball = Bodies.circle(90, 280, 20, {
  render: {
    sprite: {
      texture: "https://opengameart.org/sites/default/files/styles/medium/public/SoccerBall_0.png",
      xScale: 0.4,
      yScale: 0.4
    }
  }
});
var addCircle=function(){
  return Bodies.circle(Math.random()*400+30,70,20)
};
var car = Composites.car(190, 100, 100, 45, 30);

World.add(engine.world, [topWall, leftWall, rightWall, bottomWall, ball,car]);

Engine.run(engine);

Render.run(render);


$('.linear').on('click', function () {
    Body.setVelocity( ball, {x: 10, y: -10});
});
$('.linearleft').on('click', function () {
  Body.setVelocity( ball, {x: -10, y: -10});
});
$('.angular').on('click', function () {
    Body.setAngularVelocity( ball, Math.PI/6);
});
$('.force').on('click', function () {
  Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0.05, y: 0});
});


$('.vforce').on('click', function () {
  Body.applyForce( ball, {x: ball.position.x, y: ball.position.y}, {x: 0, y: -0.05});
});
$('.red-friction').on('click', function () {
  ball.friction = 0.05;
  ball.frictionAir = 0.0005;
  ball.restitution = 0.85;
});

$('.res-friction').on('click', function () {
  ball.friction = 0.05;
  ball.frictionAir = 0.001;
  ball.restitution = 0;
});
$('.ad-circle').on('click',function(){
  World.add(engine.world,addCircle())

})
$('.scale').on('click', function () {
  Matter.Composite.scale( engine.world, 0.5, 0.7, {x: 400, y: 200});
});

$('.rotate').on('click', function () {
  Matter.Composite.rotate( engine.world, Math.PI/4, {x: 400, y: 200});
});

$('.translate').on('click', function () {
  Matter.Composite.translate( engine.world, {x: 10, y: 0});
});
$('.slow-mo').on('click', function () {
  engine.timing.timeScale = 0.5;
});

$('.norm-mo').on('click', function () {
  engine.timing.timeScale = 1;
});

$('.fast-mo').on('click', function () {
  engine.timing.timeScale = 1.5;
});
$('.move-right').on('click', function () {
  Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: 0.5, y: 0});
});


$('.move-left').on('click', function () {
  Body.applyForce( car.bodies[0], {x: car.bodies[0].position.x, y: car.bodies[0].position.y}, {x: -0.5, y: 0});
});
