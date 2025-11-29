// buggy snippet
for (var i = 0; i <= 3; i++){
 const btn = document.createElement('button')
 btn.textContent = 'Button ' + 1
 btn.addEventListener('click', () => {
  alert('You clicked button ' + i)
 })
 document.body.appendChild(btn)
}
// Diagnose the bug
// This snippet renders 4 buttons on the UI. When clicking on any one of the buttons, the alert reads 'You clicked button 4' and not the button clicked
// Reproduce it in the browser => add a log statement to read i in the event handler and notice that i always comes back as 4 and not the number of the button clicked
// This happens because var is function scoped. So by the time the click happens, the loop has already finished
// Use let instead to create lexical binding, or create an IIFE

// fix
for (let i = 1; i <= 3; i++) {
 const btn = document.createElement('button');
 btn.textContent = 'Button ' + i;
 btn.addEventListener('click', function () {
   alert('You clicked button ' + i);
 });
 document.body.appendChild(btn);
}
// or
// the IIFE creates a new idx value that the handler closes over
for (let i = 1; i <= 3; i++) {
 (function (idx){
  const btn = document.createElement('button');
 btn.textContent = 'Button ' + idx;
 btn.addEventListener('click', function () {
   alert('You clicked button ' + idx);
 });
 document.body.appendChild(btn);
 })(i)
}