import Image from "next/image";

export function DoraLoading() {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <span className="text-primary text-md font-medium flex gap-1 items-center">
        Procurando a próxima aventura
        <span className="dot-animated w-5 flex items-center justify-left" />
      </span>
      <div className="flex items-center justify-center">
      <Image
        priority
        src="/dora-loading.gif"
        alt="Carregando com Dora"
        className="object-contain"
        width={128}
        height={128}
      />

      </div>
    </div>
  );
}
