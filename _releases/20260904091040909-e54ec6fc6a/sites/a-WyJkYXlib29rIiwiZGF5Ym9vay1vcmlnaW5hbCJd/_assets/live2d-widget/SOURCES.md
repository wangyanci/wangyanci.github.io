# Live2D feature-plugin asset provenance

The local widget and Koharu model were copied from the generated
`https://github.com/leezhiy/leezhiy.github.io` baseline at commit
`4308d749a4836fe6c1c9c771d29a6018412341bf`.

- `L2Dwidget.min.js` and `L2Dwidget.0.min.js`: upstream generated
  `live2dw/lib/` files.
- `assets/`: upstream generated `live2dw/assets/` Koharu model, textures,
  motions, moc and physics data.

They are packaged by `blog-live2d`, not by the Leezhiy layout.

- `models/`: all 21 packages / 22 source model variants from
  `https://github.com/xiazeyu/live2d-widget-models` commit
  `231c840a120e28ad74e7341f784dd08248caf059`; copied locally so every unique
  xiazeyu selection works in Live and Static without that collection's CDN.
- `OFFICIAL-MODELS-LICENSE`: upstream license shipped with that collection.

The settings list also includes 125 remote URLs copied from
`https://github.com/evrstr/live2d-widget-models` commit
`48e4c734e1bbc09df9b77a1c50d1021b23043d6e`. Its README indexes 126 models;
the duplicate `koharu` entry is excluded because the Leezhiy source default
already provides it, leaving 125 online choices. Cross-repository name matching
also found `chitose`, `izumi`, `miku`, `shizuku`, and `tsumiki`. Their model
entry histories are newer in evrstr (2020-11-21 versus 2017-12-24), so those
five evrstr entries replace the xiazeyu choices in the visible catalogue. The
older local files remain only as the complete pinned source snapshot and are
not duplicate choices. The remote model files are not vendored. That repository
explicitly restricts the collected models from commercial use. Model authors
retain their respective copyrights and licenses.

An online audit on 2026-08-29 fetched and parsed all 125 selected evrstr model
JSON URLs. The upstream tree itself has five optional missing references:
`katou` (one tap motion), `kurumi`, `len_impact`, and `mashiro_shifuku`
(physics), and `len_swim` (pose). Those source omissions are documented rather
than replaced with invented model data.
