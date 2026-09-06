export const aimlQuestions = {
  beginner: [
    {
      id: "ai-beg-1",
      questionText: "What distinguishes supervised learning from unsupervised learning in machine learning?",
      options: [
        { id: "ai-beg-1-a", label: "A", text: "Supervised learning trains on labeled input-output pairs, while unsupervised finds inherent patterns in unlabeled data" },
        { id: "ai-beg-1-b", label: "B", text: "Supervised learning requires continuous GPU hardware acceleration, while unsupervised runs on low-power mobile devices" },
        { id: "ai-beg-1-c", label: "C", text: "Supervised learning exclusively processes numerical tabular arrays, while unsupervised processes audio recordings" },
        { id: "ai-beg-1-d", label: "D", text: "Supervised learning updates weights through reinforcement rewards, while unsupervised uses fixed decision tree thresholds" }
      ],
      correctOptionId: "ai-beg-1-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "supervised-vs-unsupervised",
      explanationAfterAnswer: "Supervised learning models learn mappings from feature inputs to known ground-truth target labels, whereas unsupervised learning discovers clusters, manifolds, or latent representations without external labels."
    },
    {
      id: "ai-beg-2",
      questionText: "What does 'overfitting' mean when training a machine learning model?",
      options: [
        { id: "ai-beg-2-a", label: "A", text: "The model runs out of available memory space during stochastic gradient descent batch processing" },
        { id: "ai-beg-2-b", label: "B", text: "The model memorizes noise in the training set and fails to generalize effectively to unseen test data" },
        { id: "ai-beg-2-c", label: "C", text: "The model converges too rapidly because the learning rate was initialized to an excessively small value" },
        { id: "ai-beg-2-d", label: "D", text: "The model requires continuous feature normalization to handle extreme floating-point numerical ranges" }
      ],
      correctOptionId: "ai-beg-2-b",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "overfitting-concepts",
      explanationAfterAnswer: "Overfitting occurs when a high-capacity model captures idiosyncrasies and random noise in the training dataset rather than true underlying relationships, leading to high training accuracy but poor test performance."
    },
    {
      id: "ai-beg-3",
      questionText: "What is the primary role of an activation function in an artificial neural network?",
      options: [
        { id: "ai-beg-3-a", label: "A", text: "To compress high-resolution multi-channel image tensors into lower-dimensional dense embedding vectors" },
        { id: "ai-beg-3-b", label: "B", text: "To calculate the final validation accuracy metrics across batches at the end of each training epoch" },
        { id: "ai-beg-3-c", label: "C", text: "To introduce non-linearity, enabling the network to learn complex non-linear functional mappings" },
        { id: "ai-beg-3-d", label: "D", text: "To initialize weight matrices using zero-mean Gaussian distributions before gradient updates begin" }
      ],
      correctOptionId: "ai-beg-3-c",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "neural-activation-functions",
      explanationAfterAnswer: "Without non-linear activation functions (like ReLU or GELU), stacking linear layers collapses mathematically into a single linear transformation, preventing the network from modeling non-linear functions."
    },
    {
      id: "ai-beg-4",
      questionText: "Why is a dataset partitioned into distinct training, validation, and test splits?",
      options: [
        { id: "ai-beg-4-a", label: "A", text: "To prevent data duplication and reduce the storage space required by relational database indexes" },
        { id: "ai-beg-4-b", label: "B", text: "To distribute forward pass tensor operations evenly across multiple GPU compute nodes in parallel" },
        { id: "ai-beg-4-c", label: "C", text: "To ensure that model hyperparameters can be dynamically adjusted during real-time client inference" },
        { id: "ai-beg-4-d", label: "D", text: "To train parameters, tune hyperparameters objectively, and evaluate final generalization performance" }
      ],
      correctOptionId: "ai-beg-4-d",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "train-val-test-split",
      explanationAfterAnswer: "The training set fits model parameters, the validation set guides hyperparameter tuning and model selection without test leakage, and the test set provides an unbiased evaluation of generalization."
    },
    {
      id: "ai-beg-5",
      questionText: "In classification tasks, what metric calculates the proportion of true positive predictions among all positive predictions made?",
      options: [
        { id: "ai-beg-5-a", label: "A", text: "Precision, measuring how many of the positively predicted instances were actually true positive cases" },
        { id: "ai-beg-5-b", label: "B", text: "Recall, measuring what proportion of all actual positive ground truth cases were successfully retrieved" },
        { id: "ai-beg-5-c", label: "C", text: "Accuracy, measuring the total percentage of correct predictions across all binary class labels" },
        { id: "ai-beg-5-d", label: "D", text: "Specificity, measuring the proportion of true negative instances that were correctly categorized" }
      ],
      correctOptionId: "ai-beg-5-a",
      difficulty: "beginner",
      complexity: "fundamental",
      conceptTag: "classification-precision-recall",
      explanationAfterAnswer: "Precision is defined as TP / (TP + FP), indicating the purity of positive predictions. Recall is TP / (TP + FN), measuring coverage of actual positive samples."
    },
    {
      id: "ai-beg-6",
      questionText: "A customer churn prediction model has 98% accuracy on a dataset where 98% of users never churn. What is the issue?",
      options: [
        { id: "ai-beg-6-a", label: "A", text: "The neural network architecture has too many hidden layers, causing severe vanishing gradient descent" },
        { id: "ai-beg-6-b", label: "B", text: "The accuracy metric is misleading due to class imbalance because predicting the majority class yields high accuracy" },
        { id: "ai-beg-6-c", label: "C", text: "The learning rate was configured too high, causing the optimizer to skip past optimal cost function minima" },
        { id: "ai-beg-6-d", label: "D", text: "The training dataset requires transformation using principal component analysis to reduce dimensionality" }
      ],
      correctOptionId: "ai-beg-6-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "class-imbalance-metrics",
      explanationAfterAnswer: "Under severe class imbalance, a naive model predicting only the majority class achieves high overall accuracy while failing entirely to identify the minority class of interest (churners). Precision, recall, and PR-AUC are required."
    },
    {
      id: "ai-beg-7",
      questionText: "Why is feature scaling (e.g. Standardization or Min-Max normalization) important for gradient-based algorithms?",
      options: [
        { id: "ai-beg-7-a", label: "A", text: "It prevents large-magnitude features from dominating gradients, enabling faster and smoother convergence" },
        { id: "ai-beg-7-b", label: "B", text: "It converts categorical string variables directly into dense continuous numerical embedding vectors" },
        { id: "ai-beg-7-c", label: "C", text: "It completely eliminates the mathematical need to compute loss function gradients during backpropagation" },
        { id: "ai-beg-7-d", label: "D", text: "It guarantees that decision tree split thresholds remain invariant across multi-threaded data batches" }
      ],
      correctOptionId: "ai-beg-7-a",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "feature-scaling-gradient-descent",
      explanationAfterAnswer: "Disparate feature scales warp loss surfaces into elongated ellipses, causing gradient descent to oscillate erratically. Scaling normalizes contour curvature, allowing direct and stable convergence."
    },
    {
      id: "ai-beg-8",
      questionText: "Which technique helps prevent a deep neural network from overfitting during training?",
      options: [
        { id: "ai-beg-8-a", label: "A", text: "Increasing model capacity by adding several dense layers with random weight initialization" },
        { id: "ai-beg-8-b", label: "B", text: "Applying Dropout to randomly deactivate a subset of neuron activations during each training step" },
        { id: "ai-beg-8-c", label: "C", text: "Removing all activation functions so the network functions purely as a series of linear matrices" },
        { id: "ai-beg-8-d", label: "D", text: "Increasing the batch size until it equals the total number of samples in the entire dataset" }
      ],
      correctOptionId: "ai-beg-8-b",
      difficulty: "beginner",
      complexity: "application",
      conceptTag: "dropout-regularization",
      explanationAfterAnswer: "Dropout acts as a regularizer by randomly zeroing out neuron outputs during training passes, preventing co-adaptation of feature representations and encouraging redundant, robust representations."
    },
    {
      id: "ai-beg-9",
      questionText: "An image classification model achieves 99% accuracy on training data but drops to 62% on validation data. What action is indicated?",
      options: [
        { id: "ai-beg-9-a", label: "A", text: "Add data augmentation and weight decay regularization to constrain variance and reduce overfitting" },
        { id: "ai-beg-9-b", label: "B", text: "Increase model complexity by tripling the channel depth of every convolutional feature extractor" },
        { id: "ai-beg-9-c", label: "C", text: "Switch the optimizer from Adam to gradient ascent to force the loss function toward zero error" },
        { id: "ai-beg-9-d", label: "D", text: "Eliminate all validation samples and evaluate exclusively on the high-performing training split" }
      ],
      correctOptionId: "ai-beg-9-a",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "high-variance-regularization",
      explanationAfterAnswer: "A large generalization gap (99% train vs 62% val) is the classic hallmark of high variance (overfitting). Effective remediations include data augmentation, L2 regularization (weight decay), and reducing architecture capacity."
    },
    {
      id: "ai-beg-10",
      questionText: "What does the learning rate hyperparameter control in gradient descent optimization?",
      options: [
        { id: "ai-beg-10-a", label: "A", text: "The total number of epochs the model is permitted to train before early stopping triggers" },
        { id: "ai-beg-10-b", label: "B", text: "The step size taken in the negative gradient direction to update model weights during each step" },
        { id: "ai-beg-10-c", label: "C", text: "The ratio of training samples allocated to validation testing during K-fold cross-validation" },
        { id: "ai-beg-10-d", label: "D", text: "The threshold value used to convert continuous probability predictions into binary class decisions" }
      ],
      correctOptionId: "ai-beg-10-b",
      difficulty: "beginner",
      complexity: "challenging",
      conceptTag: "learning-rate-mechanics",
      explanationAfterAnswer: "The learning rate scales the magnitude of parameter updates with respect to the gradient of the loss function. Too large causes divergence; too small leads to excessively slow convergence."
    }
  ],

  intermediate: [
    {
      id: "ai-int-1",
      questionText: "How does the self-attention mechanism in Transformer models capture contextual relationships across a sequence?",
      options: [
        { id: "ai-int-1-a", label: "A", text: "By sliding fixed-size convolutional kernels across sequential token embeddings to pool localized n-gram patterns" },
        { id: "ai-int-1-b", label: "B", text: "By passing hidden state vectors sequentially through recurrent feedback loops with gate reset operations" },
        { id: "ai-int-1-c", label: "C", text: "By computing scaled dot-product attention scores between Query, Key, and Value projections of all tokens" },
        { id: "ai-int-1-d", label: "D", text: "By projecting token counts through singular value decomposition to extract latent topic frequencies" }
      ],
      correctOptionId: "ai-int-1-c",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "transformer-self-attention",
      explanationAfterAnswer: "Self-attention computes attention weights between Query and Key representations of every token pair via softmax(QK^T / sqrt(d_k)), creating weighted aggregations of Value vectors across the entire context window in parallel."
    },
    {
      id: "ai-int-2",
      questionText: "What is the primary architectural purpose of residual connections (skip connections) in deep neural networks?",
      options: [
        { id: "ai-int-2-a", label: "A", text: "To compress weight matrices by projecting dense tensor representations into sparse lower-dimensional spaces" },
        { id: "ai-int-2-b", label: "B", text: "To mitigate vanishing gradients by providing an unimpeded identity shortcut for backward gradient flow" },
        { id: "ai-int-2-c", label: "C", text: "To replace non-linear activation functions with deterministic mathematical identity transformations" },
        { id: "ai-int-2-d", label: "D", text: "To dynamically re-order training input batches according to individual sample loss magnitudes" }
      ],
      correctOptionId: "ai-int-2-b",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "residual-connections-gradients",
      explanationAfterAnswer: "Residual connections (F(x) + x) permit gradients to propagate directly through the identity path during backpropagation without repeated matrix attenuations, enabling stable training of very deep architectures."
    },
    {
      id: "ai-int-3",
      questionText: "What is the fundamental difference between Bagging (e.g. Random Forest) and Boosting (e.g. XGBoost)?",
      options: [
        { id: "ai-int-3-a", label: "A", text: "Bagging trains independent models in parallel to reduce variance, while Boosting trains sequentially to reduce bias" },
        { id: "ai-int-3-b", label: "B", text: "Bagging exclusively uses deep neural networks, while Boosting is restricted to shallow linear regression models" },
        { id: "ai-int-3-c", label: "C", text: "Bagging trains on unlabeled unsupervised data, while Boosting requires continuous reward signals from environments" },
        { id: "ai-int-3-d", label: "D", text: "Bagging assigns exponential sample weights to hard examples, while Boosting averages unweighted predictions" }
      ],
      correctOptionId: "ai-int-3-a",
      difficulty: "intermediate",
      complexity: "fundamental",
      conceptTag: "bagging-vs-boosting",
      explanationAfterAnswer: "Bagging averages predictions from independently trained high-variance base estimators on bootstrap samples (variance reduction). Boosting trains estimators sequentially, with each subsequent model focusing on the residuals/errors of predecessors (bias reduction)."
    },
    {
      id: "ai-int-4",
      questionText: "When evaluating an information retrieval system or search engine, what does Mean Reciprocal Rank (MRR) evaluate?",
      options: [
        { id: "ai-int-4-a", label: "A", text: "The average cosine similarity score computed across all document embedding vectors in the index" },
        { id: "ai-int-4-b", label: "B", text: "The average reciprocal rank of the first relevant retrieved result across a set of queries" },
        { id: "ai-int-4-c", label: "C", text: "The proportion of retrieved documents that contain exact keyword matches in their title tags" },
        { id: "ai-int-4-d", label: "D", text: "The execution latency required by the vector database to perform approximate nearest neighbor lookups" }
      ],
      correctOptionId: "ai-int-4-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "information-retrieval-mrr",
      explanationAfterAnswer: "MRR is calculated as (1/|Q|) * sum(1 / rank_i) for the first relevant document returned for each query Q_i. It evaluates whether the top-ranked recommendation is relevant."
    },
    {
      id: "ai-int-5",
      questionText: "How does Low-Rank Adaptation (LoRA) enable parameter-efficient fine-tuning (PEFT) of large language models?",
      options: [
        { id: "ai-int-5-a", label: "A", text: "By pruning the bottom 80% of least activated attention heads and fine-tuning only the remaining layers" },
        { id: "ai-int-5-b", label: "B", text: "By freezing pretrained weights and injecting trainable low-rank rank decomposition matrices into attention layers" },
        { id: "ai-int-5-c", label: "C", text: "By quantizing all floating-point weight tensors to 1-bit binary representations during forward passes" },
        { id: "ai-int-5-d", label: "D", text: "By training a separate lightweight distilled model to generate prompts for the frozen base foundation model" }
      ],
      correctOptionId: "ai-int-5-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "lora-peft-fine-tuning",
      explanationAfterAnswer: "LoRA decomposes the weight update delta W = B * A, where B and A are low-rank matrices (e.g. rank 8). Original weights remain frozen, reducing trainable parameters by orders of magnitude."
    },
    {
      id: "ai-int-6",
      questionText: "In a medical diagnosis task where failing to detect an illness is catastrophic, which metric should the model prioritize?",
      options: [
        { id: "ai-int-6-a", label: "A", text: "Precision, to ensure that every patient predicted as positive is guaranteed to have the condition" },
        { id: "ai-int-6-b", label: "B", text: "Recall, to minimize false negatives and ensure almost all actual positive cases are detected" },
        { id: "ai-int-6-c", label: "C", text: "Specificity, to ensure that healthy individuals are never subjected to secondary confirmation tests" },
        { id: "ai-int-6-d", label: "D", text: "Cohen's Kappa, to measure agreement between multiple independent statistical baseline classifiers" }
      ],
      correctOptionId: "ai-int-6-b",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "cost-sensitive-metric-selection",
      explanationAfterAnswer: "When false negatives (missing a sick patient) carry high penalties, high recall is critical (Recall = TP / (TP + FN)). Lower precision produces false alarms, which can be ruled out by follow-up tests."
    },
    {
      id: "ai-int-7",
      questionText: "What problem arises when applying Batch Normalization with an extremely small micro-batch size (e.g. 2 samples per worker)?",
      options: [
        { id: "ai-int-7-a", label: "A", text: "High variance in batch mean and variance estimates introduces noisy normalization and degrades model convergence" },
        { id: "ai-int-7-b", label: "B", text: "Memory allocation explodes because smaller batches require exponential tensor padding in CUDA kernels" },
        { id: "ai-int-7-c", label: "C", text: "Gradient tensors become completely zeroed out due to mathematical floating-point underflow" },
        { id: "ai-int-7-d", label: "D", text: "The network becomes mathematically equivalent to an unregularized single-layer perceptron" }
      ],
      correctOptionId: "ai-int-7-a",
      difficulty: "intermediate",
      complexity: "application",
      conceptTag: "batch-normalization-batch-size",
      explanationAfterAnswer: "Batch Normalization relies on mini-batch statistics to estimate population mean and variance. Small batch sizes yield noisy, inaccurate estimates, destabilizing training. Group Normalization or Layer Normalization is preferred."
    },
    {
      id: "ai-int-8",
      questionText: "What distinguishes semantic search using dense vector embeddings from traditional BM25 lexical keyword search?",
      options: [
        { id: "ai-int-8-a", label: "A", text: "Dense embeddings capture conceptual meaning and synonyms, while BM25 matches exact lexical term overlap" },
        { id: "ai-int-8-b", label: "B", text: "Dense embeddings execute without requiring any vector indexing structures or computational storage" },
        { id: "ai-int-8-c", label: "C", text: "BM25 is trained end-to-end via gradient descent, while dense embeddings rely on inverted document index files" },
        { id: "ai-int-8-d", label: "D", text: "BM25 evaluates multi-modal images, while dense embeddings are mathematically restricted to ASCII characters" }
      ],
      correctOptionId: "ai-int-8-a",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "dense-embeddings-vs-bm25",
      explanationAfterAnswer: "BM25 scores documents based on term frequency and inverse document frequency of exact keywords. Dense vector embeddings (from bi-encoders) represent text in semantic latent spaces, matching concepts even with zero word overlap."
    },
    {
      id: "ai-int-9",
      questionText: "Why is the Softmax temperature parameter adjusted during language model generation?",
      options: [
        { id: "ai-int-9-a", label: "A", text: "Lowering temperature flattens token logits toward a uniform distribution to maximize generation randomness" },
        { id: "ai-int-9-b", label: "B", text: "Temperature controls the learning rate decay schedule applied to weights during speculative decoding" },
        { id: "ai-int-9-c", label: "C", text: "Lowering temperature sharpens the distribution toward top tokens, producing more deterministic output" },
        { id: "ai-int-9-d", label: "D", text: "Temperature scales GPU core clock frequencies dynamically during continuous batch token generation" }
      ],
      correctOptionId: "ai-int-9-c",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "softmax-temperature-sampling",
      explanationAfterAnswer: "Dividing logits by temperature T before softmax controls distribution entropy. As T -> 0, the distribution concentrates on the highest-probability token (argmax); as T increases, it spreads probability across more tokens."
    },
    {
      id: "ai-int-10",
      questionText: "In a Retrieval-Augmented Generation (RAG) pipeline, what is the primary purpose of a re-ranker model?",
      options: [
        { id: "ai-int-10-a", label: "A", text: "To compress large document collections into summarized plain-text chunks before initial vector indexing" },
        { id: "ai-int-10-b", label: "B", text: "To perform cross-encoder scoring on candidate retrieved chunks to order them accurately by query relevance" },
        { id: "ai-int-10-c", label: "C", text: "To translate non-English user queries into standardized English before running semantic embedding lookups" },
        { id: "ai-int-10-d", label: "D", text: "To automatically delete outdated documentation records from vector databases after each generation request" }
      ],
      correctOptionId: "ai-int-10-b",
      difficulty: "intermediate",
      complexity: "challenging",
      conceptTag: "rag-cross-encoder-reranker",
      explanationAfterAnswer: "First-stage retrieval (bi-encoders / BM25) is fast but retrieves false positives. A cross-encoder re-ranker performs full joint attention over (query, document) pairs, producing highly accurate relevance rankings for the LLM context."
    }
  ],

  advanced: [
    {
      id: "ai-adv-1",
      questionText: "In Large Language Models, what key computational bottleneck does FlashAttention resolve in the standard self-attention operation?",
      options: [
        { id: "ai-adv-1-a", label: "A", text: "It tiles attention computation to avoid materializing the full N x N attention matrix in slow GPU High Bandwidth Memory" },
        { id: "ai-adv-1-b", label: "B", text: "It replaces multi-head attention with static feed-forward networks using low-rank singular value decompositions" },
        { id: "ai-adv-1-c", label: "C", text: "It converts token embeddings from floating-point tensors into ternary integer representations before softmax operations" },
        { id: "ai-adv-1-d", label: "D", text: "It splits model parameters across distributed GPU clusters using pipeline parallelism and zero-redundancy buffers" }
      ],
      correctOptionId: "ai-adv-1-a",
      difficulty: "advanced",
      complexity: "fundamental",
      conceptTag: "flash-attention-io-awareness",
      explanationAfterAnswer: "Standard attention reads and writes the intermediate N x N attention matrix to slow GPU HBM repeatedly. FlashAttention is IO-aware: it tiles Q, K, V blocks into fast on-chip SRAM, computing softmax online without materializing the full N x N matrix in HBM."
    },
    {
      id: "ai-adv-2",
      questionText: "How does Direct Preference Optimization (DPO) simplify alignment compared to traditional RLHF with PPO?",
      options: [
        { id: "ai-adv-2-a", label: "A", text: "It trains an independent discriminator network to classify generated outputs as human or synthetic in real time" },
        { id: "ai-adv-2-b", label: "B", text: "It mathematically derives an exact closed-form policy loss directly from preference data, eliminating the reward model" },
        { id: "ai-adv-2-c", label: "C", text: "It replaces supervised fine-tuning by optimizing continuous reinforcement rewards through actor-critic networks" },
        { id: "ai-adv-2-d", label: "D", text: "It uses evolutionary genetic algorithms to mutate model weight checkpoints across distributed worker pools" }
      ],
      correctOptionId: "ai-adv-2-b",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "dpo-vs-ppo-alignment",
      explanationAfterAnswer: "DPO leverages the analytical mapping between the optimal policy and the reward function under Bradley-Terry preferences, training the policy directly on (chosen, rejected) pairs using binary cross-entropy without training an explicit reward model or sampling with PPO."
    },
    {
      id: "ai-adv-3",
      questionText: "What problem in multi-GPU distributed training does the ZeRO-3 (Zero Redundancy Optimizer) memory optimization eliminate?",
      options: [
        { id: "ai-adv-3-a", label: "A", text: "It eliminates redundant weight tensor replications by sharding optimizer states, gradients, and model parameters across GPUs" },
        { id: "ai-adv-3-b", label: "B", text: "It removes the requirement for inter-node InfiniBand network fabrics by compressing gradient updates to 1-bit representations" },
        { id: "ai-adv-3-c", label: "C", text: "It replaces all backward pass backpropagation steps with localized forward-mode automatic differentiation passes" },
        { id: "ai-adv-3-d", label: "D", text: "It prevents CUDA out-of-memory errors by storing all training datasets exclusively in host CPU swap memory partitions" }
      ],
      correctOptionId: "ai-adv-3-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "zero3-distributed-training",
      explanationAfterAnswer: "Standard data parallelism replicates model states on every GPU. ZeRO Stage 1 shards optimizer states, Stage 2 shards gradients, and Stage 3 shards model parameters, eliminating all redundant state memory across ranks."
    },
    {
      id: "ai-adv-4",
      questionText: "In diffusion models, what is the mathematical role of Classifier-Free Guidance (CFG) during sampling?",
      options: [
        { id: "ai-adv-4-a", label: "A", text: "It extrapolates the score estimate between conditioned and unconditioned noise predictions to trade diversity for fidelity" },
        { id: "ai-adv-4-b", label: "B", text: "It trains an auxiliary image classification head to filter out corrupted latent representations before decoding" },
        { id: "ai-adv-4-c", label: "C", text: "It speeds up reverse ODE solvers by skipping intermediate denoising timesteps through bicubic interpolation" },
        { id: "ai-adv-4-d", label: "D", text: "It projects continuous noise trajectories onto discrete manifolds using variational autoencoder codebooks" }
      ],
      correctOptionId: "ai-adv-4-a",
      difficulty: "advanced",
      complexity: "application",
      conceptTag: "classifier-free-guidance-diffusion",
      explanationAfterAnswer: "CFG computes updated noise estimates as eps_tilde = eps_uncond + s * (eps_cond - eps_uncond). Increasing guidance scale s shifts generation toward the conditioning prompt, boosting alignment and visual fidelity at the expense of sample diversity."
    },
    {
      id: "ai-adv-5",
      questionText: "Why does RoPE (Rotary Position Embedding) exhibit superior length extrapolation compared to absolute positional embeddings?",
      options: [
        { id: "ai-adv-5-a", label: "A", text: "It encodes position by multiplying Query and Key vectors by orthogonal 2D rotation matrices, making inner products relative" },
        { id: "ai-adv-5-b", label: "B", text: "It stores positional indices in discrete learned lookup tables that expand dynamically as sequence tokens arrive" },
        { id: "ai-adv-5-c", label: "C", text: "It uses sinusoidal wave frequencies that decay to zero after the first two thousand input context tokens" },
        { id: "ai-adv-5-d", label: "D", text: "It computes distance penalties purely based on absolute character offsets from the start of the document" }
      ],
      correctOptionId: "ai-adv-5-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "rope-rotary-position-embedding",
      explanationAfterAnswer: "RoPE rotates representation vectors in complex 2D planes according to position. When computing dot products <R_m q, R_n k>, the result depends strictly on the relative distance (m - n), enabling natural relative attention decay and length extrapolation techniques."
    },
    {
      id: "ai-adv-6",
      questionText: "What specific failure mode occurs in Mixture-of-Experts (MoE) architectures without auxiliary load-balancing loss terms?",
      options: [
        { id: "ai-adv-6-a", label: "A", text: "Routing collapse occurs where the gating router routes all tokens to only a small subset of experts, starving the others" },
        { id: "ai-adv-6-b", label: "B", text: "The model runs out of parameters because expert weights are continually overwritten by the central router head" },
        { id: "ai-adv-6-c", label: "C", text: "Loss function gradients become identically zero across all feed-forward networks due to floating-point underflow" },
        { id: "ai-adv-6-d", label: "D", text: "Top-k routing switches from sparse gating to dense feed-forward evaluation, exhausting available GPU memory" }
      ],
      correctOptionId: "ai-adv-6-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "moe-routing-collapse",
      explanationAfterAnswer: "Without auxiliary load balancing, a positive feedback loop develops: slightly better experts receive more tokens and optimize faster, causing the router to send even more tokens to them, leaving other experts underutilized ('expert collapse')."
    },
    {
      id: "ai-adv-7",
      questionText: "In model quantization, how does Activation-aware Weight Quantization (AWQ) protect model performance at 4-bit precision?",
      options: [
        { id: "ai-adv-7-a", label: "A", text: "By identifying salient weight channels corresponding to high-magnitude activation features and protecting them from quantization error" },
        { id: "ai-adv-7-b", label: "B", text: "By pruning attention weights entirely and replacing dense matrix multiplications with sparse lookup dictionaries" },
        { id: "ai-adv-7-c", label: "C", text: "By converting all model weights into 8-bit integers while maintaining activations in full 32-bit floating point" },
        { id: "ai-adv-7-d", label: "D", text: "By fine-tuning the quantized model over hundreds of millions of domain-specific tokens using AdamW optimization" }
      ],
      correctOptionId: "ai-adv-7-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "awq-quantization-mechanics",
      explanationAfterAnswer: "AWQ observes that not all weights are equally important: weights that interact with large-magnitude activation channels are critical. By scaling up salient channels before uniform quantization, relative rounding error on critical weights is minimized."
    },
    {
      id: "ai-adv-8",
      questionText: "What architectural vulnerability allows jailbreak attacks via Adversarial Suffixes (GCG) to bypass LLM safety alignment?",
      options: [
        { id: "ai-adv-8-a", label: "A", text: "Gradient-based search finds adversarial token sequences whose embeddings steer next-token probabilities toward affirmative compliance" },
        { id: "ai-adv-8-b", label: "B", text: "The input buffer overflows into system prompt memory space, overwriting constitutional safety directives in RAM" },
        { id: "ai-adv-8-c", label: "C", text: "Adversarial tokens force the tokenizer to output corrupted Unicode codepoints that crash downstream safety filters" },
        { id: "ai-adv-8-d", label: "D", text: "Suffixes trigger speculative decoding routines that skip safety classifier checks during high-throughput inference" }
      ],
      correctOptionId: "ai-adv-8-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "gcg-adversarial-suffix-jailbreak",
      explanationAfterAnswer: "Greedy Coordinate Gradient (GCG) attacks compute token gradients with respect to a target response (e.g. 'Sure, here is...'). The resulting adversarial suffix manipulates the attention state to override safety fine-tuning."
    },
    {
      id: "ai-adv-9",
      questionText: "In Speculative Decoding, how is mathematical equivalence to the target model's output distribution strictly guaranteed?",
      options: [
        { id: "ai-adv-9-a", label: "A", text: "Draft tokens are evaluated via speculative rejection sampling, accepting with min(1, p_target/p_draft) and resampling upon rejection" },
        { id: "ai-adv-9-b", label: "B", text: "The draft model is trained with knowledge distillation until its parameter weights become identical to the target model" },
        { id: "ai-adv-9-c", label: "C", text: "The target model only accepts draft tokens that match the greedy top-1 prediction computed over full vocabulary logits" },
        { id: "ai-adv-9-d", label: "D", text: "Draft token sequences are verified by an external reward model that assigns deterministic quality confidence scores" }
      ],
      correctOptionId: "ai-adv-9-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "speculative-decoding-rejection-sampling",
      explanationAfterAnswer: "Speculative decoding uses a lightweight draft model to generate K tokens, then verifies them in parallel on the target model. Using modified rejection sampling (accept with min(1, p/q) and sample adjusted residual on rejection), the exact target distribution is preserved."
    },
    {
      id: "ai-adv-10",
      questionText: "Why do Deep Double Descent curves contradict classical statistical learning theory regarding model complexity?",
      options: [
        { id: "ai-adv-10-a", label: "A", text: "Beyond the interpolation threshold where models fit training data perfectly, test error decreases again as overparameterization grows" },
        { id: "ai-adv-10-b", label: "B", text: "Increasing model parameters causes training error to increase monotonically while validation error approaches zero" },
        { id: "ai-adv-10-c", label: "C", text: "Adding regularization penalties always increases test error once models exceed five hundred million parameters" },
        { id: "ai-adv-10-d", label: "D", text: "Test error remains completely flat regardless of whether the model has ten parameters or ten billion parameters" }
      ],
      correctOptionId: "ai-adv-10-a",
      difficulty: "advanced",
      complexity: "challenging",
      conceptTag: "deep-double-descent-phenomenon",
      explanationAfterAnswer: "Classical theory predicts increasing test error past capacity due to overfitting. Double descent shows test error peaks at the interpolation threshold (zero training error), but then declines again in the heavily overparameterized regime due to inductive bias toward minimum-norm solutions."
    }
  ]
};
