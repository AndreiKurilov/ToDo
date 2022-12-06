let pick = false,
    current_el = null;

export const pickDown = function(e)
{
  pick = true;
  e.target.style.position = 'absolute';
  current_el = e.target.closest('.alert');

  console.log('down', e.target.closest('.alert'))
}

export const pickUp = function(e)
{
  pick = false;
  e.target.style.position = 'static';

  console.log('up', e.target.closest('.alert'))
}

export const moveEl = function()
{
    document.onmousemove = (e) => {

        if(pick)
        {
          current_el.style.left = `${e.clientX - current_el.offsetWidth / 2}px`;
          current_el.style.top= `${e.clientY - current_el.offsetHeight / 2}px`;
        }
    }
}


// export const dragEl = (Elems, Out) => {

//     Elems = document.querySelectorAll(Elems);
//     Out = document.querySelector(Out);

    

//     let pick = false,
//         current_el = null;

//     Elems.forEach((El) => {
//       El.onmousedown = function() {
//         pick = true;
//         this.style.position = 'absolute';
//         current_el = this;
//       }
  
//       El.onmouseup = function() {
//         pick = false;
//         this.style.position = 'static';
//       }
//     })

//     document.onmousemove = (e) => {

//       if(pick)
//       {
//         current_el.style.left = `${e.clientX}px`;
//         current_el.style.top= `${e.clientY}px`;
//       }


//     }

    


// }
