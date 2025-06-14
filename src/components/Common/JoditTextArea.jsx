import PropTypes from "prop-types";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";









const JoditTextArea = ({
  content,
  setContent,
  height,
  toolbarStickyOffset,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      required: true,
      height,
      toolbarStickyOffset,
      theme: "dark",
      hidePoweredByJodit: true,
      style: {
        padding: "20",
        background: "#1C2822",
        color: "#fff",
      },
    }),
    [height, toolbarStickyOffset]
  );
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)}
      onChange={() => {}}
    />
  );
};

JoditTextArea.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
  height: PropTypes.string,
  toolbarStickyOffset: PropTypes.number,
};
export default JoditTextArea;
