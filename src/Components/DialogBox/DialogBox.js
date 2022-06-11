import "./style.css";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackground } from "../../Redux/backgroundSlice";
import { changeCodeButtons } from "../../Redux/phaserSlice";
import {
  changeDialog,
  changeTip,
  selectDialogBox,
} from "../../Redux/dialogBoxSlice";


const getCharacterColor = {
  Marin: "rgb(180 227 87)",
  Jarvis: "rgb(241 186 55)", 
  Tommy: "rgb(164 35 54)", 
  Temaki: "rgb(166 159 150)", 
  Geraldo: "rgb(43 173 150)", 
}


export default function DialogBox({ dialogs, choices, codeChallenge }) {
  const dispatch = useDispatch();
  const { dialog, tip, goToChallengeCode } = useSelector(selectDialogBox);
  const [showChoices, setShowChoices] = useState(false);

  useEffect(() => {
    dispatch(changeBackground(dialogs[dialog]?.background));

  }, []);

  useEffect(() => {
    if (dialog === 0) {
      dispatch(changeTip(false));
      setShowChoices(false);
    }
    background();
  }, [dialog]);

  function nextDialog() {
    const size = dialogs.length - 1;

    if (size === dialog) {
      if (choices) {
        setShowChoices(true);
      }
      if (codeChallenge) {
        dispatch(changeTip(true));
        dispatch(changeCodeButtons(true));
      }
      return;
    }
    dispatch(changeDialog(dialog + 1));
  }

  function backDialog() {
    if (0 === dialog) return;

    dispatch(changeDialog(dialog - 1));
  }

  function background() {
    if (dialogs[dialog]?.nextBackground) {
      dispatch(changeBackground(dialogs[dialog]?.background));
    }
  }

  function renderBackNextButtons() {
    return (
      <div className={"buttonContainer"}>
        <div className="buttonItem">
          {dialog > 0 && <button onClick={() => backDialog()}>Voltar</button>}
        </div>
        <div>
          <button onClick={() => nextDialog()}>Próximo</button>
        </div>
      </div>
    );
  }

  function renderGoToChallengeCodeButton() {
    return (
      <div className={"buttonContainer"}>
        <button onClick={() => {}}>Ver codigo do Jarvis</button>
      </div>
    );
  }

  function renderChoices() {
    return (
      <div>
        <div>
          <p>
            <b>Escolhas</b>
          </p>
        </div>
        {choices.choiceDialog?.map(({ choiceText, choiceGoTo }) => (
          <div key={choiceGoTo}>
            <li>
              <a href={choiceGoTo}>{choiceText}</a>
            </li>
          </div>
        ))}
      </div>
    );
  }

  function renderTip() {
    return (
      <div>
        <div>
          <p>
            <b>Dica</b>
          </p>
          <p>{codeChallenge?.codeTip}</p>
        </div>
      </div>
    );
  }

  function renderDialog() {
    return (
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <img
              width={80}
              height={80}
              alt={dialogs[dialog]?.characterName}
              src={dialogs[dialog]?.characterImage}
              style={{ imageRendering: "pixelated", background:getCharacterColor[dialogs[dialog]?.characterName] }}
            />
          </div>
          <div style={{ paddingLeft: "8px" }}>
            <p>
              <b>{dialogs[dialog]?.characterName}</b>
            </p>
          </div>
        </div>
        <p>{dialogs[dialog]?.characterDialog}</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className={"card"}>
        {showChoices && renderChoices()}
        {!showChoices && renderDialog()}
        {tip && renderTip()}
      </div>
      {!tip && !showChoices && renderBackNextButtons()}
      {goToChallengeCode && renderGoToChallengeCodeButton()}
    </Fragment>
  );
}
