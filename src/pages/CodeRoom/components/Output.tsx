type IOutput = {
    output: any
}

const Output = ({output}: IOutput) => (
    <div className="w-full h-[100px] border-8 border-white bg-black p-4">
        <p className="text-white text-bold text-sm">{atob(output?.compile_output ?? '')}</p>
    </div>
)


export default Output;