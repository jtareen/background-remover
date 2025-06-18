type ImageDividerProps = {
    before: string;
    after: string;
    className?: string;
  };
  
  function ImageDivider({ before, after, className = ""}: ImageDividerProps) {
    return (
      <figure className={`diff ${className}`} 
      tabIndex={0}>
        <div className="diff-item-1" role="img" tabIndex={0}>
          <img alt="before" src={before} />
        </div>
        <div className="diff-item-2" role="img">
          <img alt="after" src={after} className="checkered-bg" />
        </div>
        <div className="diff-resizer"></div>
      </figure>
    );
  }
  
  export default ImageDivider;
  