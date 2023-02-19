import React, { useEffect } from 'react';
import SubItem from '@src/components/subitem/subitem';

function ContextMenu() {
  useEffect(() => {
    // Set up binding in code whenever the context menu item
    // of id "alert" is selected
    window.api.contextMenu.onReceive('loudAlert', function (args: any) {
      alert(
        `This alert was brought to you by secure-electron-context-menu by ${args.attributes.name}`,
      );

      // Note - we have access to the "params" object as defined here: https://www.electronjs.org/docs/api/web-contents#event-context-menu
      // args.params
    });

    return () => {
      // Clear any existing bindings;
      // important on mac-os if the app is suspended
      // and resumed. Existing subscriptions must be cleared
      window.api.contextMenu.clearRendererBindings();
    };
  }, []);
  return (
    <>
      <section className="section">
        <div className="container has-text-centered">
          <h1
            className="title is-1"
            cm-template="loudAlertTemplate"
            cm-payload-name="reZach"
          >
            Context menu
          </h1>
          <div className="subtitle italic">Right-click the header above!</div>
        </div>
      </section>
      <section className="section">
        <div className="container has-text-centered">
          {/* Demonstrating how to use the context menu with multiple items */}
          <SubItem id="1" />
          <SubItem id="2" />
        </div>
      </section>
    </>
  );
}

export default ContextMenu;
