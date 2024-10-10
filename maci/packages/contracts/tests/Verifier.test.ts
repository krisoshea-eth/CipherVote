import { expect } from "chai";
import { G1Point, G2Point } from "maci-crypto";
import { VerifyingKey } from "maci-domainobjs";

import type { IVerifyingKeyStruct } from "../ts/types";
import type { BigNumberish } from "ethers";

import { deployVerifier } from "../ts/deploy";
import { getDefaultSigner } from "../ts/utils";
import { Verifier } from "../typechain-types";

describe("DomainObjs", () => {
  const vk = new VerifyingKey(
    new G1Point(
      BigInt("20491192805390485299153009773594534940189261866228447918068658471970481763042"),
      BigInt("9383485363053290200918347156157836566562967994039712273449902621266178545958"),
    ),
    new G2Point(
      [
        BigInt("4252822878758300859123897981450591353533073413197771768651442665752259397132"),
        BigInt("6375614351688725206403948262868962793625744043794305715222011528459656738731"),
      ],
      [
        BigInt("21847035105528745403288232691147584728191162732299865338377159692350059136679"),
        BigInt("10505242626370262277552901082094356697409835680220590971873171140371331206856"),
      ],
    ),
    new G2Point(
      [
        BigInt("11559732032986387107991004021392285783925812861821192530917403151452391805634"),
        BigInt("10857046999023057135944570762232829481370756359578518086990519993285655852781"),
      ],
      [
        BigInt("4082367875863433681332203403145435568316851327593401208105741076214120093531"),
        BigInt("8495653923123431417604973247489272438418190587263600148770280649306958101930"),
      ],
    ),
    new G2Point(
      [
        BigInt("11700261708411360112482712242528551130212577267248363110777096731569359533937"),
        BigInt("19316071393769631071739466808924557575370046223156790236472688098546713485164"),
      ],
      [
        BigInt("8314809347259847850803251217663255270167988731493310587391546796826904220459"),
        BigInt("19027224119116513453619472056165183919393637553270616301189593772848351986009"),
      ],
    ),
    [
      new G1Point(
        BigInt("8475939680648083280638846051497134319487781451783634569144849229381887869470"),
        BigInt("15777387922383777864128245075158682837173769163333646572506201314277694741524"),
      ),
      new G1Point(
        BigInt("6307974476057044946223853054915497058693993784049217695740696374670315278450"),
        BigInt("19541766564091333476121980691242907000813131822237920987048117031710761017707"),
      ),
    ],
  );

  const proof: BigNumberish[] = [
    "1165825367733124312792381812275119057681245770152620921258630875255505370924",
    "1326527658843314194011957286833609405197138989276710702270523657454496479584",

    "7737027768984365020868604289323857674854735856726312758475237268839850113180",
    "20950373595246980797046559551868305313847958836379415962375381761472018077992",

    "13877265106716680864869634040774025553232681727839817029074568384172308524666",
    "15414074355891062201145392604892692653071670599659589357921635169192446560614",

    "18990315920454525475289309807669145530304447815324475374776788804237092237703",
    "14054172703456858179866637245926478995167764402990898943219235085496257747260",
  ];

  const publicInputs: BigNumberish[] = [
    "17771946183498688010237928397719449956849198402702324449167227661291280245514",
  ];

  let verifierContract: Verifier;

  describe("Deployment", () => {
    before(async () => {
      verifierContract = await deployVerifier(await getDefaultSigner(), true);
    });

    it("should correctly verify a proof", async () => {
      const isValid = await verifierContract.verify(proof, vk.asContractParam() as IVerifyingKeyStruct, publicInputs);

      expect(isValid).to.eq(true);
    });

    it("should return false for a proof that is not valid", async () => {
      const isValid = await verifierContract.verify(
        proof,
        vk.asContractParam() as IVerifyingKeyStruct,
        publicInputs.slice(0, -1).concat(BigInt(1)),
      );

      expect(isValid).to.eq(false);
    });
  });
});
