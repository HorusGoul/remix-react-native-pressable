import * as React from 'react';
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  PressableProps,
  TargetedEvent,
} from 'react-native';
import type { LinkProps } from 'remix';

type PrefetchBehavior = LinkProps['prefetch'];

interface PrefetchHandlers {
  onFocus?: PressableProps['onFocus'];
  onBlur?: PressableProps['onBlur'];
  onHoverIn?: PressableProps['onHoverIn'];
  onHoverOut?: PressableProps['onHoverOut'];
  onPressIn?: PressableProps['onPressIn'];
}

export function usePrefetchBehavior(
  prefetch: PrefetchBehavior,
  theirElementProps: PrefetchHandlers
) {
  let [maybePrefetch, setMaybePrefetch] = React.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = React.useState(false);
  let { onFocus, onBlur, onHoverIn, onHoverOut, onPressIn } = theirElementProps;

  React.useEffect(() => {
    if (prefetch === 'render') {
      setShouldPrefetch(true);
    }
  }, [prefetch]);

  let setIntent = () => {
    if (prefetch === 'intent') {
      setMaybePrefetch(true);
    }
  };

  let cancelIntent = () => {
    if (prefetch === 'intent') {
      setMaybePrefetch(false);
    }
  };

  React.useEffect(() => {
    if (maybePrefetch) {
      let id = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id);
      };
    }
  }, [maybePrefetch]);

  return [
    shouldPrefetch,
    {
      onFocus: composeEventHandlers(onFocus, setIntent),
      onBlur: composeEventHandlers(onBlur, cancelIntent),
      onMouseEnter: composeEventHandlers(onHoverIn, setIntent),
      onMouseLeave: composeEventHandlers(onHoverOut, cancelIntent),
      onTouchStart: composeEventHandlers(onPressIn, setIntent),
    },
  ] as const;
}

function composeEventHandlers<
  EventType extends
    | GestureResponderEvent
    | NativeSyntheticEvent<TargetedEvent>
    | React.SyntheticEvent
    | Event
>(
  theirHandler: ((event: EventType) => any) | undefined | null,
  ourHandler: (event: EventType) => any
): (event: EventType) => any {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event?.defaultPrevented) {
      ourHandler(event);
    }
  };
}
