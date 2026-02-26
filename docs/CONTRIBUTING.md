# Contributing to Brand Variant Studio

First off, thank you for considering contributing to Brand Variant Studio! It's people like you that make Brand Variant Studio such a great tool.

## Where do I go from here?

If you've noticed a bug or have a feature request, make one! It's generally best if you get confirmation of your bug or approval for your feature request this way before starting to code.

## Fork & create a branch

If this is something you think you can fix, then fork Brand Variant Studio and create a branch with a descriptive name.

A good branch name would be (where issue #325 is the ticket you're working on):

```sh
git checkout -b 325-add-new-font-filtering
```

## Implementation Guidelines

### Architecture Rules
- Ensure any new components follow the Atomic Design methodology (`atoms`, `molecules`, `organisms`, `templates`, `pages`).
- Prefix major components or utility functions with `F_` to follow the project's internal nomenclature style.
- State management relies heavily on `useState` and local IndexedDB contexts. Avoid pulling in global state managers like Redux unless absolutely mandated by a massive feature scope.

### Styling
- Only utilize strictly defined Tailwind CSS utility classes.
- Avoid writing raw CSS in `index.css` unless doing complex `@media print` manipulations or setting root CSS variables.

## Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with Brand Variant Studio's master branch:

```sh
git remote add upstream git@github.com:beydah/Brand-Variant-Studio.git
git pull upstream master
```

Then update your feature branch from your local copy of master, and push it!

```sh
git checkout 325-add-new-font-filtering
git rebase master
git push --set-upstream origin 325-add-new-font-filtering
```

Finally, go to GitHub and make a Pull Request.

## Code Review

Once your pull request is opened, it might be reviewed and merged. Be patient, someone will look into it and give you feedback!
