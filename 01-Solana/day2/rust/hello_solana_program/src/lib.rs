use solana_program::pubkey::Pubkey;
use solana_program::system_instruction;
use solana_program::program_error::ProgramError;
use solana_program::entrypoint::ProgramResult;
use solana_program::entrypoint;
use solana_program::account_info::AccountInfo;
use solana_program::pubkey::PubkeyError;

pub fn create_program_address(
  seeds: &[&[u8]],
  program_id: &Pubkey,
) -> Result<Pubkey, PubkeyError> {Pubkey::create_program_address(seeds, program_id)}

pub fn find_program_address(
    seeds: &[&[u8]],
    program_id: &Pubkey,) -> Option<(Pubkey, u8)>{Some(Pubkey::find_program_address(seeds, program_id))}

fn store_data_in_pda(_data: &[u8], program_id: &Pubkey) -> ProgramResult {

    let seeds: &[&[_]] = &[b"my-seed"];

    let (pda, _nonce) = match find_program_address(seeds, program_id) {
        Some((address, nonce)) => (address, nonce),
        None => return Err(ProgramError::InvalidAccountData),
    };

    let _instruction = system_instruction::transfer(
        &pda,
        program_id,
        100, 
    );

    Ok(())
}

fn process_instruction(
    program_id: &Pubkey,
    _accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {

    store_data_in_pda(instruction_data, program_id)?;

    Ok(())
}

entrypoint!(process_instruction);
