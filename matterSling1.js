let engine = Matter.Engine.create(); 

let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1000,
        height:600,
        wireframes: false
    }
});

let ground = Matter.Bodies.rectangle(650,500,400,50,{isStatic:true});

// Creating Objects for World 1 by 1 
// let boxA = Matter.Bodies.rectangle(400,200, 80, 80);
// let boxB = Matter.Bodies.rectangle(450,50, 80, 80); 

let mouse = Matter.Mouse.create(render.canvas); 
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible:true}
    }
}); 

render.mouse = mouse; 


let ball = Matter.Bodies.circle(400,410,30);
let sling = Matter.Constraint.create({
    pointA: {x:400, y: 410},
    bodyB: ball, 
    stiffness: 0.02
})
let stack = Matter.Composites.stack(500,270,4,4,0,0, function(x,y){
    // return Matter.Bodies.rectangle(x,y,80,80);

    // old set of shapes 
    // let sides = Math.round(Matter.Common.random(2,8));
    return Matter.Bodies.polygon(x,y, 8, 25)
})

Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render); 