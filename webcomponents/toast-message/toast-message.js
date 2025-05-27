class ToastMessage extends HTMLElement {
 constructor() {
   super();
   this.attachShadow({ mode: 'open' });

   this.shadowRoot.innerHTML = `
     <style>
       :host {
         position: fixed;
         bottom: 20px;
         left: 50%;
         transform: translateX(-50%);
         z-index: 9999;
         display: none;
       }

       .toast {
         min-width: 200px;
         padding: 12px 20px;
         border-radius: 6px;
         color: white;
         font-size: 0.9rem;
         box-shadow: 0 2px 10px rgba(0,0,0,0.2);
         animation: fadeIn 0.3s, fadeOut 0.3s 2.7s;
       }

       .info    { background-color: #3498db; }
       .success { background-color: #2ecc71; }
       .error   { background-color: #e74c3c; }

       @keyframes fadeIn {
         from { opacity: 0; transform: translateY(20px); }
         to   { opacity: 1; transform: translateY(0); }
       }

       @keyframes fadeOut {
         from { opacity: 1; transform: translateY(0); }
         to   { opacity: 0; transform: translateY(20px); }
       }
     </style>
     <div class="toast"></div>
   `;
 }

 show(message, type = 'info') {
   const toast = this.shadowRoot.querySelector('.toast');
   toast.className = `toast ${type}`;
   toast.textContent = message;

   this.style.display = 'block';

   clearTimeout(this._hideTimeout);
   this._hideTimeout = setTimeout(() => {
     this.style.display = 'none';
   }, 3000);
 }
}

customElements.define('toast-message', ToastMessage);
