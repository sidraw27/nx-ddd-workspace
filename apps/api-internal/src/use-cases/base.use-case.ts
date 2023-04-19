export interface BaseUseCase<InputPort, OutputPort> {
  execute(input: InputPort): Promise<OutputPort>;
}
