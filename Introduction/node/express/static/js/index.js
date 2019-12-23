var select = function(el) {
    return document.getElementById(el);
  },
  svg = select("svg"),
  glasses = select("glasses"),
  eyes_happy = select("eyes-happy"),
  eyes_crazy = select("eyes-crazy"),
  eyes_sexy = select("eyes-sexy"),
  mouth_happy = select("mouth-happy"),
  mouth_crazy = select("mouth-crazy"),
  mouth_cool = select("mouth-cool"),
  mouth_sexy = select("mouth-sexy"),
  cheeks = select("cheeks"),
  stem_1 = select("tige"),
  stem_2 = select("tige-1"),
  stem_3 = select("tige-2"),
  stem_4 = select("tige-3"),
  head = select("head"),
  face = select("face"),
  leaf_group_1 = select("leaf-group-1"),
  leaf_group_2 = select("leaf-group-2"),
  leaf_group_3 = select("leaf-group-3"),
  leaf_group_4 = select("leaf-group-4"),
  leaf_stem_1 = select("leaf-stem-1"),
  leaf_stem_2 = select("leaf-stem-2"),
  leaf_stem_3 = select("leaf-stem-3"),
  leaf_stem_4 = select("leaf-stem-4"),
  leaf_1 = select("leaf-1"),
  leaf_2 = select("leaf-2"),
  leaf_3 = select("leaf-3"),
  leaf_4 = select("leaf-4"),
  btn_happy = select("btn-happy"),
  btn_cool = select("btn-cool"),
  btn_crazy = select("btn-crazy"),
  btn_sexy = select("btn-sexy");

btn_happy.onclick = function() {
  glasses.style.display = "none";
  eyes_happy.style.display = "block";
  eyes_crazy.style.display = "none";
  eyes_sexy.style.display = "none";
  mouth_happy.style.display = "block";
  mouth_crazy.style.display = "none";
  mouth_cool.style.display = "none";
  mouth_sexy.style.display = "none";
  cheeks.style.display = "block";
  tlCrazy.stop();
  tlCool.stop();
  tlSexy.stop();
  timelineInit();
  tlHappy.play();
};
btn_cool.onclick = function() {
  glasses.style.display = "block";
  eyes_happy.style.display = "none";
  eyes_crazy.style.display = "none";
  eyes_sexy.style.display = "none";
  mouth_happy.style.display = "none";
  mouth_crazy.style.display = "none";
  mouth_cool.style.display = "block";
  mouth_sexy.style.display = "none";
  cheeks.style.display = "none";
  tlHappy.stop();
  tlCrazy.stop();
  tlSexy.stop();
  timelineInit();
  tlCool.play();
};
btn_crazy.onclick = function() {
  glasses.style.display = "none";
  eyes_happy.style.display = "none";
  eyes_sexy.style.display = "none";
  eyes_crazy.style.display = "block";
  mouth_happy.style.display = "none";
  mouth_crazy.style.display = "block";
  mouth_cool.style.display = "none";
  mouth_sexy.style.display = "none";
  cheeks.style.display = "none";
  tlCool.stop();
  tlHappy.stop();
  tlSexy.stop();
  timelineInit();
  tlCrazy.play();
};
btn_sexy.onclick = function() {
  glasses.style.display = "none";
  eyes_happy.style.display = "none";
  eyes_crazy.style.display = "none";
  eyes_sexy.style.display = "block";
  mouth_happy.style.display = "none";
  mouth_crazy.style.display = "none";
  mouth_cool.style.display = "none";
  mouth_sexy.style.display = "block";
  cheeks.style.display = "block";
  tlCool.stop();
  tlHappy.stop();
  tlCrazy.stop();
  timelineInit();
  tlSexy.play();
};

function timelineInit() {
  TweenMax.set(stem_1, {
    scaleY: 1,
    rotation: 0,
    transformOrigin: "center bottom"
  });
  TweenMax.set(head, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "center bottom"
  });
  TweenMax.set(leaf_group_1, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "right bottom"
  });
  TweenMax.set(leaf_group_2, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "right bottom"
  });
  TweenMax.set(leaf_group_3, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "left bottom"
  });
  TweenMax.set(leaf_group_4, {
    y: 0,
    x: 0,
    rotation: 0,
    transformOrigin: "left bottom"
  });
  TweenMax.set(head, { y: 0 });
  TweenMax.set(face, { x: 0, y: 0 });
  TweenMax.set(leaf_stem_1, { attr: { x2: 289, y2: 360 } });
  TweenMax.set(leaf_stem_2, { attr: { x2: 287.2, y2: 287 } });
  TweenMax.set(leaf_stem_3, { attr: { x2: 313.3, y2: 278.1 } });
  TweenMax.set(leaf_stem_4, { attr: { x2: 312.6, y2: 351.2 } });
  TweenMax.set(leaf_1, { x: 0, y: 0 });
  TweenMax.set(leaf_2, { x: 0, y: 0 });
  TweenMax.set(leaf_3, { x: 0, y: 0 });
  TweenMax.set(leaf_4, { x: 0, y: 0 });
  TweenMax.set(stem_1, {
    attr: { d: "M300.8,398.4c0,0,2.1-60.3,1.7-80.3c-0.5-23-6.2-92-6.2-92" }
  });
}
timelineInit();
TweenMax.set("svg", { visibility: "visible" });

var tlCrazy = new TimelineMax({ paused: true, repeat: -1 });
tlCrazy
  .to(stem_1, 0.3, { scaleY: 0.65, transformOrigin: "center bottom" }, "one")
  .to(head, 0.3, { y: 60 }, "one")
  .to(face, 0.3, { y: 3 }, "one")
  .to(leaf_group_1, 0.3, { y: 20 }, "one")
  .to(leaf_group_2, 0.3, { y: 45 }, "one")
  .to(leaf_group_3, 0.3, { y: 45 }, "one")
  .to(leaf_group_4, 0.3, { y: 20 }, "one")
  .to(
    stem_1,
    0.3,
    { scaleY: 1, rotation: -15, transformOrigin: "center bottom" },
    "two"
  )
  .to(
    head,
    0.3,
    { y: 5, x: -40, rotation: -15, transformOrigin: "center bottom" },
    "two"
  )
  .to(face, 0.3, { x: -2, y: -3 }, "two")
  .to(
    leaf_group_1,
    0.3,
    { y: 0, x: -7, rotation: -15, transformOrigin: "right bottom" },
    "two"
  )
  .to(
    leaf_group_2,
    0.3,
    { y: 10, x: -22, rotation: -15, transformOrigin: "right bottom" },
    "two"
  )
  .to(
    leaf_group_3,
    0.3,
    { y: 10, x: -24, rotation: -15, transformOrigin: "left bottom" },
    "two"
  )
  .to(
    leaf_group_4,
    0.3,
    { y: 0, x: -7, rotation: -15, transformOrigin: "left bottom" },
    "two"
  )
  .to(
    stem_1,
    0.3,
    { scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
    "three"
  )
  .to(
    head,
    0.3,
    { y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
    "three"
  )
  .to(face, 0.3, { x: 0, y: 3 }, "three")
  .to(
    leaf_group_1,
    0.3,
    { y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "three"
  )
  .to(
    leaf_group_2,
    0.3,
    { y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "three"
  )
  .to(
    leaf_group_3,
    0.3,
    { y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "three"
  )
  .to(
    leaf_group_4,
    0.3,
    { y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "three"
  )
  .to(
    stem_1,
    0.3,
    { scaleY: 1, rotation: 15, transformOrigin: "center bottom" },
    "four"
  )
  .to(
    head,
    0.3,
    { y: 5, x: 40, rotation: 15, transformOrigin: "center bottom" },
    "four"
  )
  .to(face, 0.3, { x: 2, y: -3 }, "four")
  .to(
    leaf_group_1,
    0.3,
    { y: 0, x: 7, rotation: 15, transformOrigin: "right bottom" },
    "four"
  )
  .to(
    leaf_group_2,
    0.3,
    { y: 0, x: 24, rotation: 15, transformOrigin: "right bottom" },
    "four"
  )
  .to(
    leaf_group_3,
    0.3,
    { y: 0, x: 28, rotation: 15, transformOrigin: "left bottom" },
    "four"
  )
  .to(
    leaf_group_4,
    0.3,
    { y: 0, x: 12, rotation: 15, transformOrigin: "left bottom" },
    "four"
  )
  .to(
    stem_1,
    0.3,
    { scaleY: 0.65, rotation: 0, transformOrigin: "center bottom" },
    "five"
  )
  .to(
    head,
    0.3,
    { y: 60, x: 0, rotation: 0, transformOrigin: "center bottom" },
    "five"
  )
  .to(face, 0.3, { x: 0, y: 3 }, "five")
  .to(
    leaf_group_1,
    0.3,
    { y: 20, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "five"
  )
  .to(
    leaf_group_2,
    0.3,
    { y: 45, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "five"
  )
  .to(
    leaf_group_3,
    0.3,
    { y: 45, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "five"
  )
  .to(
    leaf_group_4,
    0.3,
    { y: 20, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "five"
  )
  .to(
    stem_1,
    0.3,
    { scaleY: 1, rotation: 0, transformOrigin: "center bottom" },
    "six"
  )
  .to(
    head,
    0.3,
    { y: 0, x: 0, rotation: 0, transformOrigin: "center bottom" },
    "six"
  )
  .to(face, 0.3, { x: 0, y: 0 }, "six")
  .to(
    leaf_group_1,
    0.3,
    { y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "six"
  )
  .to(
    leaf_group_2,
    0.3,
    { y: 0, x: 0, rotation: 0, transformOrigin: "right bottom" },
    "six"
  )
  .to(
    leaf_group_3,
    0.3,
    { y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "six"
  )
  .to(
    leaf_group_4,
    0.3,
    { y: 0, x: 0, rotation: 0, transformOrigin: "left bottom" },
    "six"
  );
tlCrazy.timeScale(1.6);

var tlCool = new TimelineMax({ paused: true, repeat: -1 });
tlCool
  .to(head, 0.3, { x: 3, repeat: -1, yoyo: true }, "two")
  .to(
    leaf_group_1,
    0.3,
    { rotation: -1, transformOrigin: "right bottom", repeat: -1, yoyo: true },
    "two"
  )
  .to(
    leaf_group_2,
    0.3,
    { rotation: -1, transformOrigin: "right bottom", repeat: -1, yoyo: true },
    "two"
  )
  .to(
    leaf_group_3,
    0.3,
    { rotation: 1, transformOrigin: "left bottom", repeat: -1, yoyo: true },
    "two"
  )
  .to(
    leaf_group_4,
    0.3,
    { rotation: 1, transformOrigin: "left bottom", repeat: -1, yoyo: true },
    "two"
  );

var tlHappy = new TimelineMax();
tlHappy
  .to(
    leaf_stem_1,
    0.3,
    { attr: { x2: 250, y2: 340 }, transformOrigin: "50% 50%" },
    "one"
  )
  .to(leaf_1, 0.3, { x: -15, y: -7 }, "one")
  .to(
    leaf_stem_2,
    0.3,
    { attr: { x2: 240, y2: 267 }, transformOrigin: "50% 50%" },
    "one"
  )
  .to(leaf_2, 0.3, { x: -15, y: -7 }, "one")
  .add(happy2());

function happy2() {
  var tlHappy2 = new TimelineMax({ repeat: -1 });
  tlHappy2
    .to(
      leaf_stem_3,
      0.3,
      { attr: { x2: 335, y2: 268 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_3, 0.3, { x: 15, y: -7 }, "two+=0.5")
    .to(
      leaf_stem_4,
      0.3,
      { attr: { x2: 340, y2: 337 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_4, 0.3, { x: 15, y: -7 }, "two+=0.5")
    .to(
      leaf_stem_1,
      0.3,
      { attr: { x2: 289, y2: 360 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_1, 0.3, { x: -2, y: 0 }, "two+=0.5")
    .to(
      leaf_stem_2,
      0.3,
      { attr: { x2: 287.2, y2: 287 }, transformOrigin: "50% 50%" },
      "two+=0.5"
    )
    .to(leaf_2, 0.3, { x: -5, y: 0 }, "two+=0.5")
    .to(
      head,
      0.3,
      {
        y: 0,
        x: 5,
        rotation: 5,
        transformOrigin: "center bottom",
        ease: Power0.easeNone
      },
      "two+=0.5"
    )
    .to(
      stem_1,
      0.3,
      { x: 2, morphSVG: stem_4, ease: Power0.easeNone },
      "two+=0.5"
    )
    .to(
      leaf_stem_3,
      0.3,
      { attr: { x2: 313.3, y2: 278.1 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_3, 0.3, { x: 0, y: 0 }, "three+=0.5")
    .to(
      leaf_stem_4,
      0.3,
      { attr: { x2: 312.6, y2: 351.2 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_4, 0.3, { x: 0, y: 0 }, "three+=0.5")
    .to(
      leaf_stem_1,
      0.3,
      { attr: { x2: 250, y2: 340 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_1, 0.3, { x: -15, y: -7 }, "three+=0.5")
    .to(
      leaf_stem_2,
      0.3,
      { attr: { x2: 235, y2: 265 }, transformOrigin: "50% 50%" },
      "three+=0.5"
    )
    .to(leaf_2, 0.3, { x: -15, y: -7 }, "three+=0.5")
    .to(
      head,
      0.3,
      {
        y: 0,
        x: 0,
        rotation: 0,
        transformOrigin: "center bottom",
        ease: Power0.easeNone
      },
      "three+=0.5"
    )
    .to(
      stem_1,
      0.3,
      { x: 0, morphSVG: stem_1, ease: Power0.easeNone },
      "three+=0.5"
    );
  return tlHappy2;
}

tlHappy.timeScale(4);

var tlSexy = new TimelineMax({ paused: true, repeat: -1 });
tlSexy
  .to(stem_1, 0.3, { morphSVG: stem_2, ease: Power0.easeNone }, "one")
  .to(
    head,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: -15,
      transformOrigin: "center bottom",
      ease: Power0.easeNone
    },
    "one"
  )
  .to(
    leaf_group_1,
    0.3,
    {
      y: 0,
      x: -18,
      rotation: -20,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "one"
  )
  .to(
    leaf_group_2,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 15,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "one"
  )
  .to(
    leaf_group_3,
    0.3,
    {
      y: 0,
      x: 8,
      rotation: 30,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "one"
  )
  .to(
    leaf_group_4,
    0.3,
    {
      y: 0,
      x: -22,
      rotation: -5,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "one"
  )
  .to(stem_1, 0.3, { morphSVG: stem_1, ease: Power0.easeNone }, "two")
  .to(
    head,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "center bottom",
      ease: Power0.easeNone
    },
    "two"
  )
  .to(
    leaf_group_1,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "two"
  )
  .to(
    leaf_group_2,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "two"
  )
  .to(
    leaf_group_3,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "two"
  )
  .to(
    leaf_group_4,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "two"
  )
  .to(stem_1, 0.3, { morphSVG: stem_3, ease: Power0.easeNone }, "three")
  .to(
    head,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 15,
      transformOrigin: "center bottom",
      ease: Power0.easeNone
    },
    "three"
  )
  .to(
    leaf_group_1,
    0.3,
    {
      y: 0,
      x: 16,
      rotation: 10,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "three"
  )
  .to(
    leaf_group_2,
    0.3,
    {
      y: 0,
      x: -4,
      rotation: -30,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "three"
  )
  .to(
    leaf_group_3,
    0.3,
    {
      y: 0,
      x: -10,
      rotation: -5,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "three"
  )
  .to(
    leaf_group_4,
    0.3,
    {
      y: 0,
      x: 14,
      rotation: 20,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "three"
  )
  .to(stem_1, 0.3, { morphSVG: stem_1, ease: Power0.easeNone }, "four")
  .to(
    head,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "center bottom",
      ease: Power0.easeNone
    },
    "four"
  )
  .to(
    leaf_group_1,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "four"
  )
  .to(
    leaf_group_2,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "right bottom",
      ease: Power0.easeNone
    },
    "four"
  )
  .to(
    leaf_group_3,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "four"
  )
  .to(
    leaf_group_4,
    0.3,
    {
      y: 0,
      x: 0,
      rotation: 0,
      transformOrigin: "left bottom",
      ease: Power0.easeNone
    },
    "four"
  );
tlSexy.timeScale(0.6);