interface Position {
    x: number;
    y: number;
  }

interface PopupProps {
    screenPos: Position;
    closePopup: () => void;
}

//>
const PopupComponent: React.FC<PopupProps> = ({screenPos, closePopup}) => {
    console.log('Open popup pos:' + screenPos.x +" " +screenPos.y);
    return (
    <div className="popup" style={{ left: screenPos.x, top: screenPos.y}}>
        <div >
            <p><span className="close" onClick={closePopup}>
            &times;
            </span></p>
            <button className="popup-button">Delete</button>
        </div>
      </div>
    );
  };

export default PopupComponent;  