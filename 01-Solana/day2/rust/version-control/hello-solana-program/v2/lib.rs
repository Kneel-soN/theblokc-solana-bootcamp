
use solana_program::instruction::AccountMeta;

use solana_program::{
  account_info::AccountInfo,
  entrypoint,
  entrypoint::ProgramResult,
  msg,
  pubkey::Pubkey,
  program::invoke_signed,
};

fn process_instruction(
  program_id: &Pubkey,
  accounts: &[AccountInfo],
  instruction_data: &[u8],
) -> ProgramResult {
  msg!("{},{},{:?}", program_id, accounts.len(), instruction_data);

  let seeds: &[&[_]] = &[b"my-seed"];
  let signer = &accounts[0];
  let (pda, _nonce) = Pubkey::find_program_address(seeds, program_id);

  let instruction = solana_program::instruction::Instruction {
      program_id: program_id.clone(),
      accounts: vec![
          AccountMeta::new(*signer.key, true),
          AccountMeta::new(pda, false),
      ],
      data: instruction_data.to_vec(),
  };

  invoke_signed(&instruction, accounts, &[&seeds[..]])?;

  Ok(())
}

entrypoint!(process_instruction);
