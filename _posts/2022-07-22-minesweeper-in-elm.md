---
layout: post
title:  "Minesweeper in ELM"
tags: games elm
---

I decided to learn ELM language mostly for fun.

I found it a very comfortable language.
Setup worked at first try, the language basics are extremely easy to learn: everything is a function, immutable, without side effects.

The hard parts were the ELM Architecture, the messaging system and the Random Generators.

Once get those ideas and made the mental shift needed, it was a breeze.

[Here you can find the Minesweeper](https://github.com/ilsasdo/elm-minesweeper/blob/master/src/Minesweeper.elm) code (a single ~500 line file).


<script src="{{ base.url | prepend: site.url }}/assets/minesweeper/minesweeper.js"></script>

<div id="myapp" style="position: absolute"></div>
<script>
  var app = Elm.Minesweeper.init({
    node: document.getElementById('myapp')
  });
</script>


