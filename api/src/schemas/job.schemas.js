module.exports = (z) => {
  const jobSchema = z.object({
    job_name: z
      .string({
        required_error: "prop: 'job_name' is required.",
      })
      .trim(),
    creationDate: z.coerce.date().max(new Date()),
    closingDate: z.coerce.date().min(new Date()),
    active: z.boolean({
      required_error: "prop: 'active' is required.",
    }),
    levelRequired: z
      .string({
        required_error: "prop: 'levelRequired' is required.",
      })
      .trim(),
    studyArea: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'studyArea' is required.",
    }),
    exprienceRequired: z
      .string({
        required_error: "prop: 'exprienceRequired' is required.",
      })
      .trim(),
    industry: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'industry' is required.",
    }),
    benefits: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'benefits' is required.",
    }),
    skillsRequired: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'skillsRequired' is required.",
    }),
    jobDescription: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'jobDescription' is required.",
    }),
    jobGoal: z.array(z.string().trim().min(4)).nonempty({
      message: "prop: 'jobGoal' is required.",
    }),
    languagesRequired: z.array(z.string().trim()).nonempty({
      message: "prop: 'languagesRequired' is required.",
    }),
    availability: z
      .string({
        required_error: "prop: 'availability' is required.",
      })
      .trim(),
    contractOffered: z
      .string({
        required_error: "prop: 'contractOffered' is required.",
      })
      .trim(),
  });
  return { jobSchema };
};
