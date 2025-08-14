# MH: Wilds Damage Calculator

A build planner and damage calculator for Monster Hunter: Wilds. You can find the latest version hosted at:

https://mhwilds-calculator.app

## Status

This project is currently in maintenance mode, aka I've stopped actively working on this. I'll continue updating it (slowly) for future patches and title updates, but I won't be adding more new features any time soon.

### Todos

- [ ] Ver. 1.021 MV Changes
- [ ] Convert Thunder Resistance
- [ ] Akuma

## Notes

### Rounding

The in-game engine sometimes rounds down (by 0.1) when it shouldn't (probably due to floating point math precision). This bug tends to happen when percentage multipliers are applied.

The game always floors Attack and Element in the menu screen for display, so 250 Attack might actually be 249.999 internally (due to the above bug) and then floored to 249. However, the 0.999 is still preserved internally for damage calculations, where rounding happens only at the very final step.

Non-zero damage less than 1 is always rounded up to 1 (even 0.01). This happens separately for Raw and Element damage.

If you find a damage calculation off by more than 0.1 from in-game values, please let me know.

### Airborne

Airborne is currently only supported for Insect Glaive attacks (and a few others).

A lot of random attacks are affected by Airborne in Wilds and if anyone has the data for this it'd be a great help.

### Switch Axe Element Phial Explosions

Switch Axe Unbridled Slash and Full Release Slash Element Phial Explosions still scale weirdly with bonus Element (which is a bug that has existed since release, separate from the Element Phial buffs the weapon received in TU2). If anyone has more data on this please let me know.

### Mind's Eye

The damage bonus from Charge Blade Sword Boost and Switch Axe Sword Mode on hitzones < 45 isn't supported yet (the actual Mind's Eye skill itself works).

## License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.

Do whatever you want with it.
