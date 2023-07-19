// tests.rs

use super::*;
use solana_program::clock::Epoch;
use solana_program_test::*;

#[tokio::test]
async fn test_greeting_account() {
    // Create a program test environment
    let program_id = Pubkey::new_unique();
    let mut test = ProgramTest::new("user_input.so", program_id, processor!(process_instruction));

    // Add your program's shared object to the test environment
    test.add_program("user_input.so", program_id, None);

    // Start the test environment
    let (mut banks_client, payer, recent_blockhash) = test.start().await;

    // Prepare the test accounts
    let greeted_pubkey = Pubkey::new_unique();
    let greeted_account = Account::new(0, 0, &program_id);
    let mut counter_account = GreetingAccount::default();
    counter_account.counter = 42;

    // Initialize the greeted account with the GreetingAccount struct data
    let mut instruction_data = vec![1]; // You can put any instruction data here as needed
    instruction_data.extend_from_slice(&counter_account.try_to_vec().unwrap());

    // Call the process_instruction function
    let mut transaction = Transaction::new_with_payer(
        &[Instruction::new_with_data(program_id, &instruction_data, vec![AccountMeta::new(greeted_pubkey, false)]),],
        Some(&payer.pubkey()),
    );
    transaction.sign(&[&payer], recent_blockhash);
    banks_client.process_transaction(transaction).await.unwrap();

    // Fetch the greeted account and verify the counter has increased
    let greeted_account = banks_client.get_account(greeted_pubkey).await.unwrap().unwrap();
    let greeted_data = GreetingAccount::try_from_slice(&greeted_account.data.borrow()).unwrap();
    assert_eq!(greeted_data.counter, counter_account.counter + 1);
}
