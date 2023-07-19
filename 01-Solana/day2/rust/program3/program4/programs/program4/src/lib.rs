use anchor_lang::prelude::*;

declare_id!("Ek1JVWEd9uPvWfGgZ1RArqz6ZzB2MvppRmmzmE4vRUgz");

#[program]
pub mod program4 {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
