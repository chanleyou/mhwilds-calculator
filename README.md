# MH: Wilds Damage Calculator

A build planner and damage calculator for Monster Hunter: Wilds. You can find the latest version hosted at:

https://mhwilds-calculator.app

## Status

The calculator is currently in maintenance mode, aka I've stopped actively working on this. I'll continue updating it for future patches and title updates, but I probably won't be adding more new features any time soon.

## Updates

### Ver. 1.011

Still in progress...

- [ ] Equipment, charms and skills
- [x] Hammer MVs
- [x] Hunting Horn MVs
- [ ] Gunlance MVs
- [ ] Light Bowgun MVs
- [ ] Heavy Bowgun MVs

### Title Update 1

Done. Sliders for Wet and Bubbleblight will appear in the Buff section if your weapon has Slicked Blade.

## Notes

### Rounding

The in-game engine has some rounding issues (probably due to low-precision floating point math). Basically, numbers that should end exactly on 0.05 are sometimes rounded down to 0 instead of up to 0.1 (as they should be). This bug tends to happen when percentage multipliers are applied.

The game always floors Attack and Element in the menu screen for display, so 250 Attack might actually be 249.999 internally (due to the above bug) and then floored to 249. However, the 0.999 is still preserved internally for damage calculations, where rounding happens only at the very final step.

Non-zero damage less than 1 is always rounded up to 1 (even 0.1). This happens separately for Raw and Element damage.

If you find a damage calculation off by more than 0.1 from in-game values, please let me know.

### Airborne

Airborne is currently only supported for Insect Glaive attacks (and a few others).

A lot of random attacks are affected by Airborne in Wilds and if anyone has the data for this it'd be a great help.

### Mind's Eye

The innate Mind's Eye damage bonus from Charge Blade Sword Boost and Switch Axe Sword Mode on hitzones < 45 isn't supported yet (the actual skill itself works).

## License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for details.

Do whatever you want with it.
