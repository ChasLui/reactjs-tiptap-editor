import { Fragment, useMemo } from 'react';

import type { Editor } from '@tiptap/react';
import { BubbleMenu as BubbleMenuReact } from '@tiptap/react';

import { Separator, getBubbleDrawer } from '@/components';
import { Drawer } from '@/extensions/Drawer';
import { EditDrawerBlock } from '@/extensions/Drawer/components/EditDrawerBlock';
import { useAttributes } from '@/hooks/useAttributes';
import { useExtension } from '@/hooks/useExtension';
import { useLocale } from '@/locales';

interface IPropsBubbleMenu {
  editor: Editor
  disabled?: boolean
}

const tippyOptions = {
  maxWidth: 'auto',
  zIndex: 20,
  appendTo: 'parent',
  moveTransition: 'transform 0.1s ease-out',
};

function ItemA({ item, disabled, editor }: any) {
  const Comp = item.component;

  if (!Comp) {
    return <></>;
  }

  return (
    <Fragment>
      {item.type === 'divider'
        ? (
          <Separator className="!richtext-mx-1 !richtext-my-2 !richtext-h-[16px]"
            orientation="vertical"
          />
        )
        : (
          <Comp
            {...item.componentProps}
            disabled={disabled || item?.componentProps?.disabled}
            editor={editor}
          />
        )}
    </Fragment>
  );
}

function isDrawerNode(node: any) {
  return node.type.name === 'drawer';
}

function BubbleMenuDrawer(props: IPropsBubbleMenu) {
  const { lang } = useLocale();

  const attrs = useAttributes<any>(props.editor, Drawer.name);

  const extension = useExtension(props.editor, Drawer.name);

  const shouldShow = ({ editor }: any) => {
    const { selection } = editor.view.state;
    const { $from, to } = selection;
    let isDrawer = false;

    editor.view.state.doc.nodesBetween($from.pos, to, (node: any) => {
      if (isDrawerNode(node)) {
        isDrawer = true;
        return false; // Stop iteration if an mermaid is found
      }
    });

    return isDrawer;
  };

  const items = useMemo(() => {
    if (props.disabled) {
      return [];
    }
    return getBubbleDrawer(props.editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.disabled, props.editor, lang]);

  return (
    <>
      <BubbleMenuReact
        editor={props?.editor}
        shouldShow={shouldShow}
        tippyOptions={tippyOptions as any}
      >
        {items?.length
          ? (
            <div className="richtext-pointer-events-auto richtext-w-auto richtext-select-none richtext-rounded-sm !richtext-border richtext-border-neutral-200 richtext-bg-background richtext-px-3 richtext-py-2 richtext-shadow-sm richtext-transition-all dark:richtext-border-neutral-800">
              <div className="richtext-relative richtext-flex richtext-h-[26px] richtext-flex-nowrap richtext-items-center richtext-justify-start richtext-whitespace-nowrap">
                {items?.map((item: any, key: any) => {
                  if (item.type === 'edit' && attrs?.src) {
                    return (
                      <EditDrawerBlock
                        attrs={attrs}
                        editor={props.editor}
                        extension={extension}
                        key={`bubbleMenu-drawer-${key}`}
                      />
                    );
                  }

                  return (
                    <ItemA
                      disabled={props.disabled}
                      editor={props.editor}
                      item={item}
                      key={`bubbleMenu-drawer-${key}`}
                    />
                  );
                })}
              </div>
            </div>
          )
          : (
            <></>
          )}
      </BubbleMenuReact>
    </>
  );
}

export { BubbleMenuDrawer };
