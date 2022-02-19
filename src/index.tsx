import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import { LinkProps, PrefetchPageLinks, useHref } from 'remix';
import { usePrefetchBehavior } from './usePrefetchBehavior';
import { useLinkClickHandler } from 'react-router-dom';
import * as React from 'react';

declare module 'react-native' {
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }

  interface PressableProps {
    onHoverIn?: (event: React.MouseEvent) => void;
    onHoverOut?: (event: React.MouseEvent) => void;
  }

  interface ViewProps {
    href?: string;
  }
}

interface RemixPressableLinkProps {
  to: LinkProps['to'];
  state?: any;
  replace?: boolean;
  reloadDocument?: boolean;
  prefetch?: LinkProps['prefetch'];
}

export type RemixPressableProps = Omit<PressableProps, 'href'> &
  RemixPressableLinkProps;

export function useRemixPressableProps({
  to,
  prefetch = 'none',
  ...props
}: RemixPressableProps): PressableProps & {
  shouldPrefetch: boolean;
  href: string;
} {
  const href = useHref(to);
  const [shouldPrefetch, prefetchHandlers] = usePrefetchBehavior(
    prefetch,
    props
  );
  const internalOnPress = useLinkClickHandler(to, props);

  function handlePress(event: GestureResponderEvent) {
    props.onPress?.(event);

    if (
      !event.defaultPrevented &&
      !props.reloadDocument &&
      isOnClickEvent(event)
    ) {
      internalOnPress(event);
    }
  }

  return {
    href,
    ...prefetchHandlers,
    ...props,
    onPress: handlePress,
    shouldPrefetch,
  };
}

export function RemixPressable({ ...props }: RemixPressableProps) {
  const { shouldPrefetch, ...pressableProps } = useRemixPressableProps(props);

  return (
    <>
      <Pressable {...pressableProps} />

      {shouldPrefetch ? <PrefetchPageLinks page={pressableProps.href} /> : null}
    </>
  );
}

function isOnClickEvent(
  event: any
): event is React.MouseEvent<HTMLAnchorElement> {
  return event.nativeEvent instanceof MouseEvent;
}

interface RemixPressableChildrenProps extends RemixPressableLinkProps {
  children: (
    props: Omit<ReturnType<typeof useRemixPressableProps>, 'shouldPrefetch'>
  ) => React.ReactNode;
}

export function RemixPressableChildren(props: RemixPressableChildrenProps) {
  const { children, ...remixPressableProps } = props;
  const { shouldPrefetch, ...pressableProps } =
    useRemixPressableProps(remixPressableProps);

  return (
    <>
      {children(pressableProps)}

      {shouldPrefetch ? <PrefetchPageLinks page={pressableProps.href} /> : null}
    </>
  );
}
