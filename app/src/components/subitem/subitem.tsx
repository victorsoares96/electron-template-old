import { useEffect } from 'react';

function SubItem(props: { id: string }) {
  useEffect(() => {
    // Set up binding in code whenever the context menu item
    // of id "alert" is selected
    window.api.contextMenu.onReceive(
      'softAlert',
      function (args: any) {
        console.log(
          `This alert was brought to you by secure-electron-context-menu by ${args.attributes.name}`,
        );

        // Note - we have access to the "params" object as defined here: https://www.electronjs.org/docs/api/web-contents#event-context-menu
        // args.params
      },
      props.id,
    );

    return () => {
      window.api.contextMenu.clearRendererBindings();
    };
  }, []);
  return (
    <div id="subitem">
      <div
        cm-template="softAlertTemplate"
        cm-id={props.id}
        cm-payload-name={`Child (${props.id})`}
      >
        ID ({props.id}): Try right-clicking me for a custom context menu
      </div>
    </div>
  );
}

export default SubItem;
