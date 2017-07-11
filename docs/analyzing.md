# Analysing your Project

Code splitting, chunking, and deferred loading are great ways to speed up your site. But you need to know where to use the `promise-loader` or `async import()`. If you are using react-router you may have already [split your code](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md), which is great. Some of the features on those pages might not be needed on pageload though, and these are the things we can also lazy-load.

There are three properties that we're looking for in a module that make it a good candidate for lazy loading after the initial pageload:

1. It should be a large amount of bytes.
2. It should be easy to remove - making 100 changes all over the place sucks.
3. It should be something that's not needed on pageload, or not needed by the majority of visitors, or just something that requires too many bytes for its purpose.

By default Bonsai sorts modules by their 'Weighted Module Size'. This is a metric that is calculated by summing the Weighted File Size of each dependency, where each dependency's Weight is shared between all the dependants. Put another way: it's a fabricated number. But it's valuable because it grows quickly when code reuse is low, and when modules have many unique dependencies. This is the best way to find those big modules.

Next you will want to look at the number of dependants that big module has. The fewer the better! These are the places where you'll have to add lazy-loading, go in and replace the old module with a leaner one, or remove it altogether.

See how we might reason about and [analyse a simple project](manual-analysis.md) without Bonsai.
