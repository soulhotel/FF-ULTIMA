import { XIcon } from '../assets/Svg.jsx';

export function Modal({ title, className = '', onClose, footer, children }) {
  return (
    <div className={`modal ${className}`.trim()}>
      <flex-row class="modal-header">
        <h1>{title}</h1>
        {onClose && <button className="close" onClick={onClose} title="Close"><XIcon /></button>}
      </flex-row>
      <flex-column class="modal-content">{children}</flex-column>
      {footer && <flex-row class="modal-footer">{footer}</flex-row>}
    </div>
  );
}