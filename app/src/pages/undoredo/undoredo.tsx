import React from "react";
// @ts-ignore
import { UNDO, REDO, CLEAR, GROUPBEGIN, GROUPEND } from "easy-redux-undo";
import { increment, decrement } from "@src/store/counter/counter.slice";
import { add, remove } from "@src/store/complex/complex.slice";
import { useAppSelector } from "@src/hooks/useAppSelector";
import { useAppDispatch } from "@src/hooks/useAppDispatch";

import "./undoredo.css";

function UndoRedo() {
  const dispatch = useAppDispatch();

  const counter = useAppSelector(state => state.undoable.present.counter);
  const complex = useAppSelector(state => state.undoable.present.complex);
  const past = useAppSelector(state => state.undoable.past);
  const present = useAppSelector(state => state.undoable.present);
  const future = useAppSelector(state => state.undoable.future);
  return (
    <React.Fragment>
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title is-1">Undo/Redo</h1>
          
          <div className="subtitle">
            Try out modifying, and then undo/redoing the redux history below!
          </div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Counter</label>
                </div>
                
                <div className="field-body">
                  <div className="field is-horizontal">
                    <div className="control">
                      <input
                        className="input"
                        value={counter.value}
                        disabled={true}
                      />
                    </div>
                    
                    <button className="button is-primary" onClick={() => dispatch(decrement())}>
                      Decrement
                    </button>
                    
                    <button className="button is-primary ml-2" onClick={() => dispatch(increment())}>
                      Increment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Complex</label>
                </div>
                
                <div className="field-body">
                  <div className="field is-horizontal">
                    <div className="control">
                      <input
                        className="input"
                        value={complex.length}
                        disabled={true}
                      />
                    </div>
                    
                    <button className="button is-primary" onClick={() => dispatch(add())}>
                      Add
                    </button>
                    
                    <button
                      className="button is-primary ml-2"
                      onClick={() => dispatch(remove())}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              <label className="label">Controls</label>
            </div>
          </div>
          
          <div className="columns">
            <div className="column">
              <div className="buttons">
                <button className="button is-info" onClick={() => dispatch(UNDO())}>
                  Undo
                </button>
                
                <button className="button is-info" onClick={() => dispatch(REDO())}>
                  Redo
                </button>
                
                <button className="button is-info" onClick={() => dispatch(UNDO(2))}>
                  Undo 2
                </button>
                
                <button className="button is-info" onClick={() => dispatch(REDO(2))}>
                  Redo 2
                </button>
                
                <button className="button is-info" onClick={() => dispatch(CLEAR())}>
                  Clear
                </button>
                
                <button
                  className="button is-info"
                  onClick={() => dispatch(GROUPBEGIN())}>
                  Group begin
                </button>
                
                <button className="button is-info" onClick={() => dispatch(GROUPEND())}>
                  Group end
                </button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <pre className="undo-container">
                {JSON.stringify(present, null, 2)}
              </pre>
            </div>

            <strong>Undo/Redo state information</strong><br/>
            
            <span>Past length: {past.length}</span>
            
            <br />
            
            <span>Future length: {future.length}</span>
          </div>            
        </div>
      </section>
    </React.Fragment>
  );
}

export default UndoRedo;
