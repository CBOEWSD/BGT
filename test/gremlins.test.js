var horde = gremlins.createHorde()
    .gremlin(gremlins.species.clicker())
    .gremlin(gremlins.species.scroller())
    .mogwai(gremlins.mogwais.gizmo())
    .mogwai(gremlins.mogwais.fps());

if (window.phantomHorde) {
    window.phantomHorde(horde, { nb: 600 });
} else {
    horde.unleash({ nb: 600 });
}