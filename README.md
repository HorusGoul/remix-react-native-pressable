# remix-react-native-pressable

[![NPM](https://img.shields.io/npm/v/remix-react-native-pressable.svg)](https://www.npmjs.com/package/remix-react-native-pressable)
[![Bundlephobia][bundlephobia-badge]][bundlephobia]
[![Github All Contributors][all-contributors-badge]](#contributors)
[![License][license-badge]][license]
[![License][twitter-badge]][twitter]
[![License][star-badge]][star]

React Native Web's `Pressable`, but with Remix's Link magic.

## How to use:

Imagine `<RemixPressable>` is like a Remix `<Link>`, but with all the React Native Web `Pressable` props!

Here's a little example using the `to` property.

```tsx
import { View, Text } from 'react-native';
import { RemixPressable } from 'remix-react-native-web';

export default function MyRemixRoute() {
  return (
    <View>
      <RemixPressable to="/about">
        <Text>Link to /about</Text>
      </RemixPressable>
    </View>
  );
}
```

We also provide a `<RemixPressableChildren>` component and a `useRemixPressableProps` hook, in case you want to build your own wrapper or use the render prop pattern.

## More docs:

- Check out the [Remix's `<Link>` documentation for more info](https://remix.run/docs/en/v1/api/remix#link).
- Since Remix's `<Link>` wraps React Router DOM's `<Link>`, you can use [the same props](https://reactrouter.com/docs/en/v6/api#link).
- Also, React Native Web's `Pressable` has a [full list of props](https://necolas.github.io/react-native-web/docs/pressable/).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://horus.dev"><img src="https://avatars.githubusercontent.com/u/6759612?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Horus Lugo</b></sub></a><br /><a href="#maintenance-HorusGoul" title="Maintenance">🚧</a> <a href="#ideas-HorusGoul" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/HorusGoul/remix-react-native-pressable/commits?author=HorusGoul" title="Code">💻</a> <a href="#design-HorusGoul" title="Design">🎨</a> <a href="https://github.com/HorusGoul/remix-react-native-pressable/pulls?q=is%3Apr+reviewed-by%3AHorusGoul" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- prettier-ignore-start -->
[all-contributors-badge]: https://img.shields.io/github/all-contributors/HorusGoul/remix-react-native-pressable/main
[license-badge]: https://img.shields.io/github/license/HorusGoul/remix-react-native-pressable
[license]: ./LICENSE
[bundlephobia-badge]: https://img.shields.io/bundlephobia/minzip/remix-react-native-pressable
[bundlephobia]: https://bundlephobia.com/package/remix-react-native-pressable
[twitter-badge]: https://img.shields.io/twitter/follow/horusgoul.svg?style=social&label=Follow
[twitter]: https://twitter.com/horusgoul
[star-badge]: https://img.shields.io/github/stars/HorusGoul/remix-react-native-pressable.svg?style=social&label=Star
[star]: https://github.com/horusgoul/remix-react-native-pressable
<!-- prettier-ignore-end -->
