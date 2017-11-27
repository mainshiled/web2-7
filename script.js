onload = function(){

var canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 300;

var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  var v_shader = create_shader('vs');
  var f_shader = create_shader('fs');
  
  var prg = create_program(v_shader, f_shader);
  
  var attLocation = new Array(2);
  attLocation[0] = gl.getAttribLocation(prg, 'position');
  attLocation[1] = gl.getAttribLocation(prg, 'color'); 
  
  var attStride =new Array(2);
  attStride[0] = 3;
  attStride[1] = 4;
  
  var position = [
    0.0, 1.0, 0.0,
     1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
    ];
  var color = [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0
    ];
  
  var pos_vbo = create_vbo(position);
  var col_vbo = create_vbo(color);
  
  set_attribute([pos_vbo, col_vbo],attLocation, attStride);
 
  var uniLocation = gl.getUniformLocation(prg, 'mvpMatrix');
  
var m = new matIV();

var wMatrix = m.identity(m.create());
var vMatrix = m.identity(m.create());
var pMatrix = m.identity(m.create());
var vpMatrix = m.identity(m.create());
var wvpMatrix = m.identity(m.create()); 

m.lookAt([0.0, 0.0, 5.0], [0, 0, 0], [0, 1, 0], vMatrix);
m.perspective(45, canvas.wedth / canvas.height, 0.1, 100, pMatrix);
m.multiply(pMatrix, vMatrix, vpMatrix);
  
   var count = 0;

  (function(){
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

var rad = (count% 360) * Math.PI / 180;

m.identity(wMatrix);
m.traslate(wMatrix, [1.0, -1.0, 0.0],wMatrix);
m.rotate(wMatrix, rad [0,1,0], wMatrix);

m.multiply(vpMatrix, wMatrix,wvpMatrix);
gl.uniformMatrix4fv(uniLocation, false, wvpMatrix);
gl.drawArrays(gl.TRIANGELS, 0, 3);
    
    gl.flush();
    
    count++;
  
    setTimeout(arguments.callee, 1000 / 30);
  })();
  
function create_shader(id){
  
  var shader;
  
  var scriptElement = document.getElementById(id);
  
  if(!scriptElement){return;}
  
  switch(scriptElement.type){
    case 'x-shader/x-vertex':
       shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default:
      return;
  }
  
  gl.shaderSource(shader, scriptElement.text);
  
  gl.compileShader(shader);
  
  if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
return shader;
  }else{
    alert(gl.getShaderInfoLog(shader));
  }
}
  
  function create_program(vs, fs){
    
    var program = gl.createProgram();
    
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    
    gl.linkProgram(program);
    
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
      gl.useProgram(program);
    return program;
    }else{
      alert(gl.getProgramInfoLog(program));
    }
  }
  
  function create_vbo(data){
    
    var vbo = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    return vbo;
  }
  
  function set_attribute(vbo, attL, attS){
    
    for(var i in vbo){
      
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
      
      gl.enableVertexAttribArray(attL[i]);
                    
      gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
    }
  }
    
};
