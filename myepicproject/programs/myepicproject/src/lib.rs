// import anchor tools
use anchor_lang::prelude::*;

declare_id!("5NXdBN5s3pj6vVi4x6DcyEGPGtuFp4vhMHn9qSXUSppp");

// extend program and include myepicproject module
#[program]
pub mod myepicproject {
    use super::*;

    pub fn start_stuff_off(ctx: Context<StartStuffOff>) -> Result<()> {
        // Get a reference to the account.
        let base_account = &mut ctx.accounts.base_account;
        
        // Initialize total_gifs.
        base_account.total_gifts = 0;

        Ok(())
    }

    pub fn add_gift(ctx: Context<AddGift>, gif_link: String) -> Result<()> {
        let base_account = &mut ctx.accounts.base_account;
        let user = &mut ctx.accounts.user;

        let item = Item {
            gif_link: gif_link.to_string(),
            user_address: *user.to_account_info().key
        };
        
        base_account.gifs.push(item);
        base_account.total_gifts += 1;
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct StartStuffOff<'info> {
    #[account(init, payer = user, space = 9000)]
    pub base_account: Account<'info, BaseAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddGift<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
    #[account(mut)]
    pub user: Signer<'info>,    
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Item {
    pub gif_link: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_gifts: u64,
    pub gifs: Vec<Item>,
}
