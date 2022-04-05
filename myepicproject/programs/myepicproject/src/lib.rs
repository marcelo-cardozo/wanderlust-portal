// import anchor tools
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// extend program and include myepicproject module
#[program]
pub mod myepicproject {
    use super::*;

    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartStuffOff {}
