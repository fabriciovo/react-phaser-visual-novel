import Highlighter from "../Highlighter/Highlighter";
import DialogBox from "../DialogBox/DialogBox";
import CodeChallenge from "./codeChallenge.json";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import { Fragment, useLayoutEffect } from "react";
import { selectModal } from "../../Redux/modalSlice";
import { useParams } from "react-router-dom";

export default function TextGame() {
  const { data } = CodeChallenge;
  const { id } = useParams();
  const { modal } = useSelector(selectModal);

  function Textgame() {
    return (
      <Fragment>
        <Highlighter dataCode={data} id={id} />
        <DialogBox
          dialogs={data[id]?.dialogs}
          codeChallenge={data[id]?.codeChallenge}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div
        className={"container"}
        style={{ opacity: modal.showModal ? 0.3 : 1 }}
      >
        {data[id] && Textgame()}
      </div>
      <Modal modal={modal} />
    </Fragment>
  );
}
