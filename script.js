onload = function(){

var canvas = document.getElementById('canas');
canas.width = 500;
canvas.height = 300;

var gl = canvas.getCotext('webgl') || canvas.getCotext('experiental-webgl');

  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');
  
  var prg = create_program(v_shader, f_shader);
  
  var attLocation = new Array(2);
  attLocation[0] = gl.getAttribLocation(prg, 'position');
  attLocation[1] = gl.getAttribLocation(prg, 'color'); 
  
  var uniLocation = g.getUnifromLocation(prg, 'mvpMatrix');
  
gl.clear(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFER_BIT);

var m = new matIV();

var wMatrix = m.identity(m.create());
var vMatrix = m.identity(m.create());
var pMatrix = m.identity(m.create());
var vpMatrix = m.identity(m.create());
var wvpMatrix = m.identity(m.create());

m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0] vMatrix);
m.perspective(45, c.wedth / c.height, 0.1 100, pMatrix);
m.multiply(pMatrix, vMatrix, vpMatrix);

var rad = (count% 360) * Math.PI / 180;

m.identity(wMatrix);
m.traslate(wMatrix, [1.0, -1.0, 0.0],wMatrix);
m.rotate(wMatrix rad [0,1,0], wMatrix);

m.multiply(vpMatrix, wMatrix,wvpMatrix);
gl.uniformMatrix4fv(uniLocation, false, wvpMatrix);
l.drawArrays(gl.TRIANGELS, 0, 3);


};
