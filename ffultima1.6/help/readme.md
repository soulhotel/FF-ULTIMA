FF ULTIMA - https://github.com/soulhotel/FF-CSS-ULTIMA

a sequel to [Perfection FF CSS Theme] - https://github.com/soulhotel/Perfection-Firefox-CSS-Theme

Changing themes - size edition - https://github.com/soulhotel/FF-CSS-ULTIMA/blob/main/Modification.md

-------------------------------------------------------------------------

To choose between XS, S, L (vertical tabs size)

- go to userChrome.css
- change [ @import url(theme/all-global-positioning-l.css); ] to:

- XS [ @import url(theme/all-global-positioning-xs.css); ]
- S [ @import url(theme/all-global-positioning-s.css); ]
- L [ @import url(theme/all-global-positioning-l.css); ]

-------------------------------------------------------------------------

To switch from Full Moon to Dusky

- go to userChrome.css
- change [ @import url(theme/all-global-theme-fullmoon.css); ] to:

Dark - [ @import url(color-scheme/all-global-theme-fullmoon.css); ]
Light - [ @import url(color-scheme/all-global-theme-dusky.css); ]